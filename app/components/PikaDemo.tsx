"use client";
import { useState } from "react";

const turns = [
  {q:"Pika vomited twice last night and didn't finish breakfast.", obs:["vomiting","appetite"]},
  {q:"It started around 11pm. She seems okay now, but I'm not sure about the stool.", obs:["timing","uncertainty"]},
  {q:"There was no blood that I could see.", obs:["negative"]},
];

export default function PikaDemo() {
  const [step,setStep]=useState(0);
  const item=turns[step];
  return <section className="demoCard">
    <div className="cardTop"><div><p className="eyebrow">Deterministic judge demo</p><h2>Pika · Golden Thread</h2></div><span className="proof">OWNER_REPORTED</span></div>
    <div className="voiceRow"><div className="avatar">P</div><div><small>Finalized AssemblyAI turn</small><p>“{item.q}”</p></div></div>
    <div className="proofGrid">{item.obs.map(x=><span key={x}>✓ {x}</span>)}</div>
    <div className="demoSteps"><button onClick={()=>setStep((step+1)%turns.length)}>Next finalized turn</button><span>Turn {step+1}/3 · source-linked</span></div>
    <div className="thread"><div><strong>7D</strong><span>Current concern</span></div><div><strong>30D</strong><span>Relevant prior context</span></div><div><strong>90D</strong><span>Bounded history</span></div></div>
    <div className="safety"><strong>NO CAUSAL INFERENCE</strong><span>History is context, not a diagnosis or cause.</span></div>
    <div className="handoff"><p className="eyebrow">Professional handoff</p><h3>Context handoff only.</h3><p>Not a diagnosis or treatment plan. Every item retains an evidence reference.</p></div>
  </section>;
}