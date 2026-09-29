# VetThread Voice — Demo Scenario

## Goal

Show one complete path from frantic speech to structured, evidence-linked handoff and guarded safety routing.

This is a simulated engineering demo, not a clinical validation study.

## 00:00–00:15 — Problem

Voiceover:

> "When a pet emergency happens at night, owners rarely tell a clean clinical story. They speak emotionally, jump between symptoms, and forget important timing."

## 00:15–00:45 — Live AssemblyAI voice capture

Speak:

> "My cat Mimi is fourteen years old. Around three AM she vomited yellowish liquid twice. Now she is completely limp and cannot stand."

Show the AssemblyAI realtime connection, live transcript, finalized turn, and source evidence.

## 00:45–01:10 — Clarification and evidence

Second turn:

> "Her breathing seems fast and her gums look kind of whitish. Should I give her medicine?"

Demonstrate that facts remain attributed to the owner, no diagnosis is generated, no medication or dosing recommendation is generated, and a configured safety signal is detected.

## 01:10–01:30 — Red Alert state

Transition the UI to **RED_ALERT_CRITICAL** and stop/terminate the voice workflow through the application safety controller.

Suggested UI copy:

> **Emergency warning**
>
> The information reported indicates a situation that requires immediate veterinary attention. Stop using this voice intake and contact or transport your pet to an appropriate emergency veterinary service now.

The wording is routing guidance, not a diagnosis.

## 01:30–01:50 — Evidence-linked handoff

Show a structured payload containing patient context, owner-reported observations, source quotes, triage action, and medical_advice_given: false.

## 01:50–02:00 — Close

Voiceover:

> "VetThread Voice does not replace the veterinarian. It protects the thread between what the owner said, what the system captured, and what the veterinary team receives."

## Recording rules

- Keep the browser microphone visible.
- Show AssemblyAI connection state.
- Show finalized transcript.
- Show safety state transition.
- Show evidence-linked payload.
- Do not claim the demo proves clinical safety.
- Do not show real patient records.
- Do not expose API keys.
