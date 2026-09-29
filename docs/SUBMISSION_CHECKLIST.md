# lablab.ai Submission Checklist — AssemblyAI Voice Agent Hackathon

Checked against the current public hackathon page on September 29, 2026.

## Required submission assets

- [ ] Project title: VetThread Voice
- [ ] Short description
- [ ] Long description
- [ ] Technology & category tags
- [ ] Cover image
- [ ] Video presentation
- [ ] Slide presentation
- [ ] Public GitHub repository
- [ ] Demo application platform
- [ ] Application URL

## Short description

VetThread Voice turns frantic pet-parent speech into an evidence-linked veterinary handoff. Built with AssemblyAI Realtime Speech-to-Text, it captures spoken observations, preserves source evidence, asks bounded clarifying questions, and routes configured high-risk signals into a guarded emergency UI state without diagnosing or prescribing.

## Long description

VetThread Voice is a realtime voice intake and veterinary handoff prototype for high-stress pet emergencies. Pet parents often describe events out of order, mix observations with questions, and omit timing or context. VetThread Voice uses AssemblyAI Realtime Speech-to-Text to capture the conversation, then applies an evidence layer that keeps structured observations tied to finalized owner-reported source turns.

The product deliberately avoids diagnosis, treatment, dosing, prescription, prognosis, and unsupported causal claims. Instead, it focuses on capture, clarification, structure, provenance, safety routing, and professional handoff.

For the hackathon demo, a simulated midnight feline emergency shows how the system moves from realtime speech to a structured handoff and then into a deterministic RED_ALERT_CRITICAL UI state when configured safety signals are detected.

The commercial direction is B2B SaaS for veterinary clinics, emergency hospitals, and veterinary ecosystem partners through monthly or annual subscriptions.

## 2-minute video

1. 0:00–0:15 — Midnight emergency problem.
2. 0:15–0:45 — Live AssemblyAI realtime voice capture.
3. 0:45–1:10 — Evidence extraction and clarification.
4. 1:10–1:30 — RED_ALERT_CRITICAL transition.
5. 1:30–1:50 — Evidence-linked handoff.
6. 1:50–2:00 — Product value and B2B direction.

## Final technical checks

- [ ] npm test passes.
- [ ] npm run evaluate passes.
- [ ] ASSEMBLYAI_API_KEY is stored only as a deployment secret.
- [ ] No API key appears in source, README, screenshots, or video.
- [ ] Demo URL works in an incognito browser.
- [ ] Microphone permission works.
- [ ] AssemblyAI Realtime connection works.
- [ ] Safety state transition is reproducible.
- [ ] Repository contains no real client/patient data.
- [ ] Repository is set to Public before submission.

## Deadline

The current event page lists the submission deadline as September 30, 2026 at 3:00 PM UTC, which is September 30, 2026 at 11:00 PM Malaysia time (UTC+8).

## Judging dimensions shown on the event page

- Application of Technology
- Presentation
- Business Value
- Originality

Make four things immediately visible:

**real AssemblyAI usage → working demo → clear business use → distinctive evidence/safety architecture**
