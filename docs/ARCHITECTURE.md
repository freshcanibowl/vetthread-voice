# VetThread Voice Architecture

```
Browser Mic
   ↓
AssemblyAI Universal-3.5 Pro Realtime
   ↓
Finalized Voice Turn
   ↓
Evidence Layer
   ├── OWNER_REPORTED
   ├── PRIOR_CONTEXT
   └── UNKNOWN
   ↓
Clarification (≤3)
   ↓
7D / 30D / 90D Context
   ↓
VetThread Handoff
```

Only finalized AssemblyAI turns become durable evidence. Partial transcript is ephemeral.

CAIOS remains isolated. Reuse requires Architecture Review → Regression Tests → ADR → Isolated PR.
