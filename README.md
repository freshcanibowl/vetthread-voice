# VetThread Voice

**Speak the story. Bring your vet the thread.**

Hackathon-isolated prototype for the AssemblyAI Voice Agent Hackathon 2026.

## Product thesis
Pet parents remember symptoms as stories. Veterinarians need timelines and context. VetThread Voice converts natural spoken observations into a structured longitudinal veterinary handoff without diagnosing or replacing a veterinarian.

## Architecture
Browser Mic → AssemblyAI Universal-3.5 Pro Realtime → finalized turns → VetThread Evidence Layer → clarification → longitudinal context → professional handoff.

## Safety boundary
Allowed: capture, clarify, structure, contextualize, handoff.
Prohibited: diagnosis, differential diagnosis, treatment, dosing, prescription, prognosis, fabricated history, causal claims.

## Engineering status
Day 10 freeze: **57/57 fixture regression tests PASS**; evaluation harness PASS. These are engineering fixture results, not clinical validation.

This repository is intentionally isolated from CAIOS. Any future reuse follows:
Evidence → Architecture Review → Regression Tests → ADR → Isolated PR.

## Local run
```bash
cp .env.example .env.local
# set ASSEMBLYAI_API_KEY
npm install
npm run dev
```
