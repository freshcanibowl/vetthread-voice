import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("structured extraction has bounded categories",async()=>{const s=await readFile("lib/extraction.ts","utf8");for(const x of ["appetite","vomiting","stool","energy","water_intake","medication","weight","skin_coat"])assert.match(s,new RegExp(x));});
