import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("red flag categories are explicit",async()=>{const s=await readFile("lib/safety.ts","utf8");for(const x of ["breathing_difficulty","collapse","seizure","visible_blood","toxin_ingestion"])assert.match(s,new RegExp(x));});
test("low confidence requires confirmation",async()=>{const s=await readFile("lib/safety.ts","utf8");assert.match(s,/CONFIRM_BEFORE_ALERT/);assert.match(s,/\.75/);});
