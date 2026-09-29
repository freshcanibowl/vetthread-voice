import type { FinalVoiceTurn, ObservationCandidateInput } from "./types";

const categoryRules: Array<[string, RegExp]> = [
  ["appetite", /eat|eating|appetite|food/i],
  ["vomiting", /vomit|vomiting|threw up|throwing up/i],
  ["stool", /stool|poop|diarrhea|diarrhoea|loose/i],
  ["energy", /energy|lethargic|tired|active/i],
  ["water_intake", /water|drinking|thirst/i],
  ["medication", /medication|medicine|drug|tablet/i],
  ["weight", /weight|weighs|kg|kilo/i],
  ["skin_coat", /itch|itchy|coat|skin|rash/i]
];

export function detectCategories(transcript: string): string[] {
  return categoryRules.filter(([, rule]) => rule.test(transcript)).map(([category]) => category);
}

export function proposeObservations(turn: FinalVoiceTurn, petId: string): ObservationCandidateInput[] {
  const categories = detectCategories(turn.transcript);
  return categories.map((category) => ({
    petId,
    sourceTurnId: turn.id,
    sourceQuote: turn.transcript,
    sourceType: "OWNER_REPORTED",
    category,
    value: turn.transcript,
    certainty: "reported",
    timePrecision: "unknown"
  }));
}