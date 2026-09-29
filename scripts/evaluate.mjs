import { readFile } from "node:fs/promises";
const checks=[
 ["README product thesis",/Pet parents remember stories/],
 ["AssemblyAI token route",/ASSEMBLYAI_API_KEY/],
 ["AssemblyAI realtime endpoint",/streaming\.assemblyai\.com/],
 ["Universal 3.5 Pro",/universal-3-5-pro/],
 ["source provenance",/OWNER_REPORTED/],
 ["clarification cap",/maxItems":3/],
 ["causal boundary",/NO_CAUSAL_INFERENCE/],
 ["handoff disclaimer",/Not a diagnosis or treatment plan/]
];
let pass=0;
for(const [label,re] of checks){const hay=(await readFile("README.md","utf8"))+"\n"+(await readFile("app/components/VoiceCapture.tsx","utf8"))+"\n"+(await readFile("schemas/clarification-plan.schema.json","utf8"))+"\n"+(await readFile("lib/longitudinal-context.ts","utf8"))+"\n"+(await readFile("lib/handoff.ts","utf8"));if(re.test(hay)){pass++;console.log("PASS",label)}else console.log("FAIL",label)}
console.log(`Evaluation: ${pass}/${checks.length} checks passed`);
if(pass!==checks.length)process.exitCode=1;
