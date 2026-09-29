import type { ObservationCandidate } from "./types";
import type { ContextWindow } from "./longitudinal-context";

export interface HandoffItem { section: string; text: string; evidenceRefs: string[]; sourceType: "OWNER_REPORTED"|"PRIOR_CONTEXT"|"UNKNOWN"; }
export interface VetThreadHandoff { disclaimer: string; sections: HandoffItem[]; }

export function generateVetThread(observations: ReadonlyArray<ObservationCandidate>, context: ReadonlyArray<ContextWindow>): VetThreadHandoff {
  const current = observations.map(o => ({section:"PRIMARY_CONCERN", text:String(o.value), evidenceRefs:[o.id], sourceType:o.sourceType}));
  const prior = context.flatMap(w => w.observations).map(o => ({section:"PRIOR_CONTEXT", text:String(o.value), evidenceRefs:[o.id], sourceType:"PRIOR_CONTEXT" as const}));
  return { disclaimer:"Context handoff only. Not a diagnosis or treatment plan.", sections:[...current,...prior] };
}