# lablab.ai Submission Pack — VetThread Voice

## Project
**VetThread Voice — Speak the story. Bring your vet the thread.**

## Short description
VetThread Voice turns frantic pet-parent speech into an evidence-linked veterinary handoff. Built with AssemblyAI Realtime Speech-to-Text, it captures spoken observations, preserves source evidence, asks bounded clarifying questions, and routes configured high-risk signals into a guarded emergency UI state without diagnosing or prescribing.

## Long description
VetThread Voice is a realtime voice intake and veterinary handoff prototype for high-stress pet emergencies. Pet parents often describe events out of order, mix observations with questions, and omit timing or context. VetThread Voice uses AssemblyAI Realtime Speech-to-Text to capture the conversation, then applies an evidence layer that keeps structured observations tied to finalized owner-reported source turns.

The product deliberately avoids diagnosis, treatment, dosing, prescription, prognosis, and unsupported causal claims. Instead, it focuses on capture, clarification, structure, provenance, safety routing, and professional handoff.

For the hackathon demo, a simulated midnight feline emergency shows how the system moves from realtime speech to a structured handoff and then into a deterministic RED_ALERT_CRITICAL UI state when configured safety signals are detected.

The commercial direction is B2B SaaS for veterinary clinics, emergency hospitals, hospital groups, and veterinary ecosystem partners through monthly or annual subscriptions.

## Technology
- AssemblyAI Realtime Speech-to-Text API
- Next.js
- React
- TypeScript
- WebSocket realtime audio/transcription
- Evidence-linked source turns
- Deterministic safety-state controller

## Demo narrative
1. Pet parent speaks naturally during a simulated emergency.
2. AssemblyAI provides realtime transcription.
3. VetThread preserves source evidence instead of inventing missing facts.
4. The system asks bounded clarification questions.
5. Configured critical safety signals trigger RED_ALERT_CRITICAL and stop voice interaction.
6. A structured handoff is prepared for the veterinary team.

## Safety boundary
This is an engineering prototype and hackathon demonstration, not a clinically validated medical or veterinary device. It does not diagnose, prescribe, dose, or replace veterinary professionals.

## Submission assets
- Public GitHub: https://github.com/freshcanibowl/vetthread-voice
- Cover artwork: /public/vetthread-voice-cover.svg
- Editable pitch deck: https://canva.link/v09tsygp6425nk2
- Demo URL: **PENDING VERCEL DEPLOYMENT**
- 2-minute video: **PENDING RECORDING**

## Final pre-submit checks
- [x] GitHub repository public
- [x] AssemblyAI realtime implementation present
- [x] Evidence layer present
- [x] Safety-state controller present
- [x] Regression tests and evaluation harness present
- [x] Demo scenario documented
- [x] Pitch deck prepared
- [x] Cover artwork prepared
- [ ] Public demo URL verified
- [ ] Microphone/realtime production smoke test
- [ ] 2-minute video recorded
- [ ] lablab submission form completed
- [ ] Final Submit clicked before the official deadline

## Positioning line
**Pet parents remember stories. Veterinarians need timelines and context. VetThread Voice converts a pet parent's natural spoken story into an evidence-linked veterinary handoff.**
