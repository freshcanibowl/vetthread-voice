"use client";
import { useRef, useState } from "react";
import { evaluateSafety } from "../../lib/safety";
import { transitionVetThreadUI, type AgentUIState } from "../../lib/vetthread-ui";

export default function VoiceCapture() {
  const [status,setStatus]=useState("Ready");
  const [text,setText]=useState("");
  const [uiState,setUiState]=useState<AgentUIState>("IDLE");
  const [alertReason,setAlertReason]=useState("");
  const wsRef=useRef<WebSocket|null>(null);
  const audioRef=useRef<AudioContext|null>(null);
  const processorRef=useRef<ScriptProcessorNode|null>(null);
  const transcriptRef=useRef("");

  function teardown(){
    processorRef.current?.disconnect();
    audioRef.current?.close();
    if(wsRef.current?.readyState===WebSocket.OPEN) wsRef.current.send(JSON.stringify({type:"Terminate"}));
    wsRef.current?.close();
  }

  function stop(){ teardown(); setStatus("Stopped"); }

  // The safety controller runs on every finalized turn. It routes to RED_ALERT_CRITICAL and
  // stops the voice workflow; it never produces a diagnosis, disease name, or treatment advice.
  function finalizeTurn(transcript:string,confidence:number){
    const safety=evaluateSafety(transcript,confidence);
    const transition=transitionVetThreadUI("LISTENING",{
      symptoms:[],
      safetySignals:safety.map((result)=>result.signal),
    });
    setUiState(transition.to);
    if(transition.to==="RED_ALERT_CRITICAL"){
      setAlertReason(transition.reason);
      if(transition.stopVoice) teardown();
      setStatus("RED_ALERT_CRITICAL");
      return;
    }
    setStatus("Final turn captured");
  }

  async function start() {
    setStatus("Requesting microphone…");
    setUiState("LISTENING");
    setAlertReason("");
    transcriptRef.current="";
    const tokenResponse=await fetch("/api/assemblyai-token");
    if(!tokenResponse.ok){setStatus("Server token unavailable"); return;}
    const tokenData=await tokenResponse.json();
    const token=tokenData.token ?? tokenData;
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const ws=new WebSocket("wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&encoding=pcm_s16le&token="+encodeURIComponent(token)+"&speech_model=universal-3-5-pro");
    wsRef.current=ws;
    ws.onopen=()=>{
      setStatus("Listening with AssemblyAI Realtime…");
      const ctx=new AudioContext();
      audioRef.current=ctx;
      const source=ctx.createMediaStreamSource(stream);
      const processor=ctx.createScriptProcessor(4096,1,1);
      processorRef.current=processor;
      processor.onaudioprocess=(event)=>{
        if(ws.readyState!==WebSocket.OPEN)return;
        const input=event.inputBuffer.getChannelData(0);
        const pcm=new Int16Array(input.length);
        for(let i=0;i<input.length;i++){const s=Math.max(-1,Math.min(1,input[i]));pcm[i]=s<0?s*0x8000:s*0x7fff;}
        ws.send(pcm.buffer);
      };
      source.connect(processor); processor.connect(ctx.destination);
    };
    ws.onmessage=(event)=>{
      try{
        const msg=JSON.parse(event.data);
        if(msg.type==="Turn" && msg.transcript){ transcriptRef.current=msg.transcript; setText(msg.transcript); }
        if(msg.type==="Turn" && msg.end_of_turn){
          finalizeTurn(transcriptRef.current,typeof msg.confidence==="number"?msg.confidence:1);
        }
      }catch{}
    };
    ws.onerror=()=>setStatus("AssemblyAI connection error");
  }

  return (
    <div className="liveCard">
      <div>
        <strong>{status}</strong>
        <p>{text||"Your finalized AssemblyAI transcript will appear here."}</p>
        {uiState==="RED_ALERT_CRITICAL" && (
          <div className="redAlert" role="alert">
            <strong>RED_ALERT_CRITICAL — Emergency warning</strong>
            <span>The information reported indicates a situation that requires immediate veterinary attention. Stop using this voice intake and contact or transport your pet to an appropriate emergency veterinary service now.</span>
            <span className="redAlertReason">Routing guidance, not a diagnosis. {alertReason}</span>
          </div>
        )}
      </div>
      <div className="liveActions"><button onClick={start}>Start voice</button><button onClick={stop}>Stop</button></div>
    </div>
  );
}
