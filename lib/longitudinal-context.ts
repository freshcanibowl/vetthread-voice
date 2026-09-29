import type { ObservationCandidate } from "./types";

export interface ContextWindow { days: 7 | 30 | 90; observations: ObservationCandidate[]; note: "NO_CAUSAL_INFERENCE"; }

function daysBetween(now: Date, date: Date): number {
  return Math.floor((now.getTime() - date.getTime()) / 86400000);
}

export function getLongitudinalContext(observations: ReadonlyArray<ObservationCandidate>, petId: string, now = new Date()): ContextWindow[] {
  const pet = observations.filter(o => o.petId === petId);
  return ([7,30,90] as const).map(days => ({
    days,
    observations: pet.filter(o => {
      if (!o.observedAt) return false;
      const age = daysBetween(now, new Date(o.observedAt));
      return age >= 0 && age <= days;
    }).sort((a,b) => (new Date(b.observedAt ?? 0).getTime()) - (new Date(a.observedAt ?? 0).getTime())),
    note: "NO_CAUSAL_INFERENCE"
  }));
}