import type { FinalVoiceTurn } from "./types";

export type AssemblyAITurnMessage = {
  type: "Turn";
  transcript?: string;
  end_of_turn?: boolean;
  turn_order?: number;
  words?: Array<{ start?: number; end?: number; confidence?: number }>;
};

export function toFinalVoiceTurn(message: AssemblyAITurnMessage): Readonly<FinalVoiceTurn> | null {
  if (!message.end_of_turn) return null;
  const transcript = message.transcript?.trim();
  if (!transcript) return null;
  const starts = message.words?.map((word) => word.start).filter((v): v is number => typeof v === "number");
  const ends = message.words?.map((word) => word.end).filter((v): v is number => typeof v === "number");
  const confidences = message.words?.map((word) => word.confidence).filter((v): v is number => typeof v === "number");
  const asrConfidence = confidences?.length ? confidences.reduce((sum, value) => sum + value, 0) / confidences.length : undefined;
  return Object.freeze({ id: `turn-${message.turn_order ?? crypto.randomUUID()}`, transcript, startedAtMs: starts?.length ? Math.min(...starts) : undefined, endedAtMs: ends?.length ? Math.max(...ends) : undefined, asrConfidence, final: true });
}