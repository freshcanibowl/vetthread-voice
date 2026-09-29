import type { FinalVoiceTurn, ObservationCandidate, ObservationCandidateInput } from "./types";

export type EvidenceValidationError = "SOURCE_TURN_NOT_FINAL" | "SOURCE_QUOTE_EMPTY" | "SOURCE_QUOTE_NOT_FOUND" | "OWNER_REPORTED_REQUIRES_SOURCE";
export type EvidenceValidationResult = { ok: true } | { ok: false; error: EvidenceValidationError };

function normalizeEvidenceText(value: string): string { return value.replace(/\s+/g, " ").trim().toLocaleLowerCase(); }

export function validateCandidateAgainstTurn(input: ObservationCandidateInput, sourceTurn: FinalVoiceTurn | undefined): EvidenceValidationResult {
  if (!sourceTurn?.final) return { ok: false, error: "SOURCE_TURN_NOT_FINAL" };
  const quote = normalizeEvidenceText(input.sourceQuote);
  if (!quote) return { ok: false, error: "SOURCE_QUOTE_EMPTY" };
  const transcript = normalizeEvidenceText(sourceTurn.transcript);
  if (!transcript.includes(quote)) return { ok: false, error: "SOURCE_QUOTE_NOT_FOUND" };
  if (input.sourceType === "OWNER_REPORTED" && input.sourceTurnId !== sourceTurn.id) return { ok: false, error: "OWNER_REPORTED_REQUIRES_SOURCE" };
  return { ok: true };
}

export function createObservationCandidate(input: ObservationCandidateInput, sourceTurn: FinalVoiceTurn, now: string = new Date().toISOString()): Readonly<ObservationCandidate> {
  const validation = validateCandidateAgainstTurn(input, sourceTurn);
  if (!validation.ok) throw new Error(validation.error);
  return Object.freeze({ ...input, id: `obs-${crypto.randomUUID()}`, evidenceVersion: 1, createdAt: now, reviewStatus: "CANDIDATE" });
}

export function freezeObservationCandidates(candidates: ReadonlyArray<ObservationCandidate>): ReadonlyArray<Readonly<ObservationCandidate>> {
  return Object.freeze(candidates.map((candidate) => Object.freeze({ ...candidate })));
}