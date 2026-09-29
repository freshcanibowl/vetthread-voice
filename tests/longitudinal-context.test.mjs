import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("context windows are bounded",async()=>{const s=await readFile("lib/longitudinal-context.ts","utf8");assert.match(s,/7 \| 30 \| 90/);assert.match(s,/age >= 0/);assert.match(s,/NO_CAUSAL_INFERENCE/);});
