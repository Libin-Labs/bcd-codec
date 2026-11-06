import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('even digits', () => {
  assert.deepEqual([...api.encodeBcd('0123')], [1, 35]);
});
test('odd filler', () => {
  assert.deepEqual([...api.encodeBcd('007')], [0, 127]);
  assert.equal(api.decodeBcd(new Uint8Array([0, 127])), '007');
});
test('empty', () => {
  assert.equal(api.decodeBcd(api.encodeBcd('')), '');
});
test('decimal roundtrips', () => {
  for (let i = 0; i < 1000; i++) assert.equal(api.decodeBcd(api.encodeBcd(String(i))), String(i));
});
test('invalid digits and padding', () => {
  assert.throws(() => api.encodeBcd('１２'));
  assert.throws(() => api.decodeBcd(new Uint8Array([0x1f, 0x23])));
  assert.throws(() => api.decodeBcd(new Uint8Array([0xa0])));
});
test('types and budget', () => {
  assert.throws(() => api.encodeBcd(1));
  assert.throws(() => api.decodeBcd([]));
  assert.throws(() => api.decodeBcd(new Uint8Array(8193)));
});
