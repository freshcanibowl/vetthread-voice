import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("clarification is bounded at three",async()=>{const s=await readFile("lib/clarification.ts","utf8");assert.match(s,/MAX_CLARIFICATION_QUESTIONS = 3/);assert.match(s,/slice\(0, MAX_CLARIFICATION_QUESTIONS\)/);});
