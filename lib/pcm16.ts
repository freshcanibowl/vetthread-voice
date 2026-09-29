export function downsampleTo16k(input: Float32Array, inputSampleRate: number): Int16Array {
  const targetRate = 16000;
  if (inputSampleRate < targetRate) throw new Error(`Unsupported microphone sample rate: ${inputSampleRate}`);
  if (inputSampleRate === targetRate) return floatToPcm16(input);
  const ratio = inputSampleRate / targetRate;
  const outputLength = Math.max(1, Math.floor(input.length / ratio));
  const output = new Float32Array(outputLength);
  for (let i = 0; i < outputLength; i += 1) {
    const start = Math.floor(i * ratio), end = Math.min(input.length, Math.floor((i + 1) * ratio));
    let sum = 0, count = 0;
    for (let j = start; j < end; j += 1) { sum += input[j]; count += 1; }
    output[i] = count ? sum / count : 0;
  }
  return floatToPcm16(output);
}
export function floatToPcm16(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return output;
}