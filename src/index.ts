function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function bytes(v: Uint8Array): void {
  if (!(v instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (v.length > 1048576) throw new RangeError('Byte budget exceeded');
}
export function encodeBcd(text: string): Uint8Array {
  strictText(text);
  if (!/^[0-9]*$/.test(text)) throw new RangeError('ASCII digits required');
  const out = new Uint8Array(Math.ceil(text.length / 2));
  for (let i = 0; i < text.length; i += 2)
    out[i / 2] = (Number(text[i]) << 4) | (i + 1 < text.length ? Number(text[i + 1]) : 15);
  return out;
}
export function decodeBcd(input: Uint8Array): string {
  bytes(input);
  if (input.length > 8192) throw new RangeError('Digit budget exceeded');
  let out = '';
  for (let i = 0; i < input.length; i++) {
    const b = input[i]!,
      hi = b >> 4,
      lo = b & 15;
    if (hi > 9 || (lo > 9 && !(lo === 15 && i === input.length - 1)))
      throw new RangeError('Invalid BCD nibble');
    out += String(hi);
    if (lo !== 15) out += String(lo);
  }
  return out;
}
