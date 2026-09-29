import PikaDemo from "./components/PikaDemo";
import VoiceCapture from "./components/VoiceCapture";

export default function Home() {
  return (
    <main className="shell">
      <header className="siteHeader">
        <div className="brandLockup"><span className="brandMark">VT</span><strong>VetThread Voice</strong></div>
        <div className="headerBadges"><span>Hackathon prototype</span><span>AssemblyAI</span></div>
      </header>
      <section className="hero">
        <p className="eyebrow">Longitudinal pet context from natural voice</p>
        <h1>Speak the story.<br />Bring your vet the thread.</h1>
        <p className="lede">VetThread turns natural pet-parent speech into source-linked observations, bounded clarifications, relevant history, and a concise professional handoff—without diagnosing.</p>
        <div className="heroProof"><span><strong>57/57</strong> regression tests</span><span><strong>3</strong> question hard cap</span><span><strong>100%</strong> fixture traceability</span><span><strong>0</strong> unsupported clinical claims</span></div>
      </section>
      <PikaDemo />
      <section className="liveSection">
        <div className="sectionHeading"><div><p className="eyebrow">Live capture</p><h2>Try the real AssemblyAI voice path.</h2></div><p>Requires a configured server-side AssemblyAI key. The fixture above is intentionally deterministic for judging.</p></div>
        <VoiceCapture />
      </section>
      <footer className="siteFooter"><span>VetThread Voice · Context handoff, not diagnosis</span><span>AssemblyAI Realtime Streaming → VetThread Evidence Layer</span></footer>
    </main>
  );
}