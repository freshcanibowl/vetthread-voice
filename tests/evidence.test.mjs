import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("evidence model declares provenance",async()=>{const s=await readFile("lib/types.ts","utf8");assert.match(s,/OWNER_REPORTED/);assert.match(s,/PRIOR_CONTEXT/);assert.match(s,/UNKNOWN/);});
test("only finalized turns become evidence",async()=>{const s=await readFile("lib/voice-turn.ts","utf8");assert.match(s,/end_of_turn/);assert.match(s,/final: true/);});
