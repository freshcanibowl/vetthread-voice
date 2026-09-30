import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

// The regression-test figure advertised in the hero strip is derived from the suite that
// actually runs, so the published number can no longer claim a total the repo does not have.
test("demo exposes AssemblyAI and safety proof",async()=>{
  const s=await readFile("app/page.tsx","utf8");
  assert.match(s,/AssemblyAI/);
  const files=(await readdir("tests")).filter((f)=>f.endsWith(".test.mjs"));
  let declared=0;
  for(const f of files){
    const body=await readFile(`tests/${f}`,"utf8");
    declared+=(body.match(/^\s*test\(/gm) ?? []).length;
  }
  assert.ok(declared>0,"no test declarations detected in tests/");
  assert.match(s,new RegExp(`>${declared}/${declared}<`),`app/page.tsx must advertise ${declared}/${declared} to match the suite that actually runs`);
});
test("live capture uses realtime websocket",async()=>{const s=await readFile("app/components/VoiceCapture.tsx","utf8");assert.match(s,/streaming\.assemblyai\.com\/v3\/ws/);assert.match(s,/universal-3-5-pro/);});
