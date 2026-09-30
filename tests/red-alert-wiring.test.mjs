import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateSafety } from "../lib/safety.ts";
import { transitionVetThreadUI } from "../lib/vetthread-ui.ts";

// Acceptance criterion for the live voice path: an owner report containing a configured
// safety pattern must route the UI to RED_ALERT_CRITICAL, stop the voice workflow, and
// emit no diagnosis, disease name, or treatment advice.
const EMERGENCY_REPORT = "My cat suddenly collapsed and is having difficulty breathing.";
const COMPONENT = new URL("../app/components/VoiceCapture.tsx", import.meta.url);

test("the emergency report matches the configured safety patterns", () => {
  const signals = evaluateSafety(EMERGENCY_REPORT, 1).map((result) => result.signal);
  assert.deepEqual(signals, ["breathing_difficulty", "collapse"]);
});

test("the emergency report routes the UI to RED_ALERT_CRITICAL and stops voice", () => {
  const signals = evaluateSafety(EMERGENCY_REPORT, 1).map((result) => result.signal);
  const transition = transitionVetThreadUI("LISTENING", { symptoms: [], safetySignals: signals });
  assert.equal(transition.to, "RED_ALERT_CRITICAL");
  assert.equal(transition.stopVoice, true);
});

test("low ASR confidence still routes to the guarded alert", () => {
  const safety = evaluateSafety(EMERGENCY_REPORT, 0.5);
  assert.ok(safety.length > 0);
  assert.ok(safety.every((result) => result.confidence === "low"));
  assert.ok(safety.every((result) => result.action === "CONFIRM_BEFORE_ALERT"));
  const transition = transitionVetThreadUI("LISTENING", { symptoms: [], safetySignals: safety.map((r) => r.signal) });
  assert.equal(transition.to, "RED_ALERT_CRITICAL");
});

test("a non-emergency turn does not raise the alert", () => {
  assert.deepEqual(evaluateSafety("Pika vomited twice last night and didn't finish breakfast.", 1), []);
  const transition = transitionVetThreadUI("LISTENING", { symptoms: [], safetySignals: [] });
  assert.equal(transition.to, "LISTENING");
});

test("the live voice component is wired to the safety controller", () => {
  const source = readFileSync(COMPONENT, "utf8");
  assert.ok(source.includes("evaluateSafety"), "VoiceCapture must call the safety controller");
  assert.ok(source.includes("transitionVetThreadUI"), "VoiceCapture must call the UI state machine");
  assert.ok(source.includes("RED_ALERT_CRITICAL"), "VoiceCapture must render the RED_ALERT_CRITICAL state");
});

test("the live voice component emits no diagnosis, disease name, or treatment advice", () => {
  // Strip comments first: the rationale comment itself names what must never be *emitted*.
  const source = readFileSync(COMPONENT, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .toLowerCase();
  for (const banned of ["prescribe", "prescription", "dosage", "antibiotic", "medication", "disease"]) {
    assert.ok(!source.includes(banned), `VoiceCapture must not contain "${banned}"`);
  }
});
