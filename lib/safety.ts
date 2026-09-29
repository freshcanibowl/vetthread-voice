export type SafetySignal = "breathing_difficulty"|"collapse"|"seizure"|"visible_blood"|"toxin_ingestion";
export interface SafetyResult { signal: SafetySignal; confidence: "high"|"low"; action: "RAISE_SAFETY_NOTICE"|"CONFIRM_BEFORE_ALERT"; evidence: string; }

const patterns: Array<[SafetySignal, RegExp]> = [
  ["breathing_difficulty", /can't breathe|cannot breathe|difficulty breathing|trouble breathing|呼吸困难/i],
  ["collapse", /collapsed|collapse|unresponsive|not responding|昏倒/i],
  ["seizure", /seizure|convulsion|fit|抽搐/i],
  ["visible_blood", /blood in (vomit|stool)|vomit.*blood|stool.*blood|便血|吐血/i],
  ["toxin_ingestion", /xylitol|rat poison|antifreeze|中毒/i]
];

export function evaluateSafety(transcript: string, asrConfidence = 1): SafetyResult[] {
  return patterns.filter(([,re])=>re.test(transcript)).map(([signal])=>({
    signal,
    confidence: asrConfidence < .75 ? "low" : "high",
    action: asrConfidence < .75 ? "CONFIRM_BEFORE_ALERT" : "RAISE_SAFETY_NOTICE",
    evidence: transcript
  }));
}