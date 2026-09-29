import test from "node:test";
import assert from "node:assert/strict";
import { transitionVetThreadUI } from "../lib/vetthread-ui.ts";

test("critical safety signal forces RED_ALERT_CRITICAL", () => {
  const result = transitionVetThreadUI("LISTENING", { symptoms: ["recumbency"] });
  assert.equal(result.to, "RED_ALERT_CRITICAL");
  assert.equal(result.stopVoice, true);
});

test("ordinary listening remains on normal path", () => {
  const result = transitionVetThreadUI("LISTENING", { symptoms: ["vomiting"] });
  assert.equal(result.to, "LISTENING");
  assert.equal(result.stopVoice, false);
});

test("explicit transport requirement forces alert", () => {
  const result = transitionVetThreadUI("SPEAKING", {
    symptoms: [],
    requiresEmergencyTransport: true,
  });
  assert.equal(result.to, "RED_ALERT_CRITICAL");
});
