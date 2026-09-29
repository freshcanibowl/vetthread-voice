export type SourceType = "OWNER_REPORTED" | "PRIOR_CONTEXT" | "UNKNOWN";
export type Certainty = "reported" | "approximate" | "uncertain" | "unknown";
export type TimePrecision = "exact" | "approximate" | "relative" | "unknown";

export interface FinalVoiceTurn {
  id: string;
  transcript: string;
  startedAtMs?: number;
  endedAtMs?: number;
  asrConfidence?: number;
  final: true;
}

export interface ObservationCandidateInput {
  petId: string;
  sourceTurnId: string;
  sourceQuote: string;
  sourceType: SourceType;
  category: string;
  value: unknown;
  certainty: Certainty;
  observedAt?: string;
  timePrecision: TimePrecision;
}

export interface ObservationCandidate extends ObservationCandidateInput {
  id: string;
  evidenceVersion: 1;
  createdAt: string;
  reviewStatus: "CANDIDATE";
}

export type Observation = Omit<ObservationCandidate, "reviewStatus"> & { reviewStatus: "ACCEPTED" };