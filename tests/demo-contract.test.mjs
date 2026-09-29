import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("demo exposes AssemblyAI and safety proof",async()=>{const s=await readFile("app/page.tsx","utf8");assert.match(s,/AssemblyAI/);assert.match(s,/57\/57/);});
test("live capture uses realtime websocket",async()=>{const s=await readFile("app/components/VoiceCapture.tsx","utf8");assert.match(s,/streaming\.assemblyai\.com\/v3\/ws/);assert.match(s,/universal-3-5-pro/);});
