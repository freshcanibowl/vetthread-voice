export type AgentUIState =
  | "IDLE"
  | "LISTENING"
  | "SPEAKING"
  | "NORMAL_HANDOFF"
  | "RED_ALERT_CRITICAL";

export interface TriagePayload {
  symptoms: string[];
  requiresEmergencyTransport?: boolean;
  safetySignals?: string[];
}

export interface UITransition {
  from: AgentUIState;
  to: AgentUIState;
  reason: string;
  stopVoice: boolean;
}

/** Deterministic product guardrail. This module does not diagnose. */
export function transitionVetThreadUI(
  current: AgentUIState,
  payload: TriagePayload
): UITransition {
  const critical =
    payload.requiresEmergencyTransport === true ||
    payload.symptoms.includes("recumbency") ||
    payload.symptoms.includes("collapse") ||
    (payload.safetySignals ?? []).some((signal) =>
      ["breathing_difficulty", "collapse", "seizure", "visible_blood", "toxin_ingestion"].includes(signal)
    );

  if (critical) {
    return {
      from: current,
      to: "RED_ALERT_CRITICAL",
      reason: "Configured safety signal requires guarded emergency routing.",
      stopVoice: true,
    };
  }

  if (current === "IDLE") {
    return { from: current, to: "LISTENING", reason: "Voice session started.", stopVoice: false };
  }

  return { from: current, to: current, reason: "No safety transition required.", stopVoice: false };
}
