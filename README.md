# VetThread Voice 🐾🎙️

> **Speak the story. Bring your vet the thread.**

Hackathon-isolated prototype for the AssemblyAI Voice Agent Hackathon 2026.

## What it does

Pet parents remember stories. Veterinarians need timelines and context. VetThread Voice converts a pet parent's natural spoken story into an evidence-linked veterinary handoff.

- **Capture** — realtime speech through AssemblyAI.
- **Clarify** — ask bounded questions when information is missing.
- **Structure** — turn spoken observations into explicit, typed fields.
- **Provenance** — keep owner-reported observations tied to finalized source turns.
- **Safety routing** — detect configured safety signals and switch into a guarded alert state.
- **Handoff** — produce a concise professional-facing summary without inventing history or clinical conclusions.

## AssemblyAI integration

Browser microphone → /api/assemblyai-token → AssemblyAI Realtime → finalized turns → VetThread Evidence Layer

The current client connects to AssemblyAI Realtime v3 with universal-3-5-pro, 16 kHz PCM audio, and a server-minted token. The API key is never placed in browser code.

## Safety boundary

VetThread Voice is **not a diagnostic or treatment system**.

Allowed: capture owner observations, clarify factual context, structure reported information, preserve source evidence, route configured high-risk signals, and prepare information for a veterinarian.

Prohibited: diagnosis, differential diagnosis, treatment recommendations, medication dosing, prescription, prognosis, fabricated history, unsupported causal claims, or presenting an AI conclusion as a veterinary decision.

## Evidence-linked architecture

```text
Pet Parent Voice
      │ realtime audio
      ▼
AssemblyAI Realtime Speech-to-Text
      │ finalized turn
      ▼
VetThread Evidence Layer
      ├── Clarification
      ├── Safety Gate ──► RED_ALERT_CRITICAL
      ▼
Longitudinal Context
      ▼
Evidence-linked Vet Handoff
```

## Core safety state machine

IDLE → LISTENING → SPEAKING → NORMAL_HANDOFF

Any configured critical safety trigger → RED_ALERT_CRITICAL → STOP / HANDOFF / SEEK PHYSICAL CARE

See lib/vetthread-ui.ts and docs/DEMO_SCENARIO.md.

## Demo scenario: midnight feline emergency

For the hackathon demo, we use a simulated owner report:

> My cat Mimi is fourteen. She vomited twice around 3 AM and now she is completely limp and cannot stand.

The demo then adds a second owner observation about fast breathing and pale-looking gums. VetThread does **not** claim a diagnosis. Instead, the configured safety gate produces a high-visibility emergency routing state and creates an evidence-linked handoff payload.

This is a **simulated engineering scenario, not clinical validation or medical advice**.

## B2B product direction

VetThread Voice is designed as a B2B SaaS layer for affiliate veterinary clinics, 24/7 emergency veterinary hospitals, hospital groups, and potential veterinary-insurance workflows.

The proposed commercial model is **monthly/annual clinic subscription**, with the clinic providing the voice intake experience to pet owners.

## Engineering status

- AssemblyAI Realtime v3 browser streaming.
- Server-side token route.
- Evidence validation against finalized source turns.
- Bounded clarification schemas.
- Longitudinal context model.
- Safety signal evaluation.
- Handoff generation.
- Regression/evaluation harness.
- Deterministic UI safety-state controller.
- Hackathon demo scenario and submission checklist.

Existing repository status: **18/18 regression tests PASS** (`npm test`) and **8/8 evaluation checks PASS** (`npm run evaluate`). Both figures are reproducible from this repository. These are engineering fixture results, **not clinical validation**.

## Local run

```bash
cp .env.example .env.local
# set ASSEMBLYAI_API_KEY
npm install
npm run dev
```

## Test

```bash
npm test
npm run evaluate
```

## Submission materials

- docs/DEMO_SCENARIO.md — 2-minute demo flow and recording script.
- docs/SUBMISSION_CHECKLIST.md — lablab.ai submission fields and final checks.
- docs/ARCHITECTURE.md — repository architecture.
- lib/vetthread-ui.ts — deterministic UI safety state machine.

## Repository isolation

This project is intentionally isolated from CAIOS and other CaniBowl repositories.

Any future reuse follows: **Evidence → Architecture Review → Regression Tests → ADR → Isolated PR**.

## Hackathon note

The current lablab.ai event page requires a public GitHub repository, working demo application, video presentation, slide presentation, and basic project information. Set this repository to Public before submission.
