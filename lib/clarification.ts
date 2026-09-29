import type { ObservationCandidate } from "./types";

export const MAX_CLARIFICATION_QUESTIONS = 3;

export interface ClarificationQuestion { id: string; prompt: string; reason: string; sourceObservationIds: string[]; }

export function planClarification(observations: ReadonlyArray<ObservationCandidate>): ClarificationQuestion[] {
  const questions: ClarificationQuestion[] = [];
  const categories = new Set(observations.map((o) => o.category));
  if (categories.has("vomiting")) questions.push({ id:"q-vomit-timing", prompt:"When did the vomiting start, and how many times has it happened?", reason:"Timing and frequency are not yet explicit.", sourceObservationIds: observations.filter(o=>o.category==="vomiting").map(o=>o.id) });
  if (categories.has("stool")) questions.push({ id:"q-stool-change", prompt:"When did the stool change begin, and is it still happening now?", reason:"Onset and current status are unclear.", sourceObservationIds: observations.filter(o=>o.category==="stool").map(o=>o.id) });
  if (categories.has("appetite")) questions.push({ id:"q-appetite-change", prompt:"Compared with normal, when did the appetite change and how much is your pet eating?", reason:"Magnitude and onset are unclear.", sourceObservationIds: observations.filter(o=>o.category==="appetite").map(o=>o.id) });
  return questions.slice(0, MAX_CLARIFICATION_QUESTIONS);
}