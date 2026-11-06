import { encodeBcd, decodeBcd } from '@lp-labs/bcd-codec';
if (decodeBcd(encodeBcd('00123')) !== '00123') throw new Error('BCD');
// @ts-expect-error invalid argument must be rejected by declarations
encodeBcd(123);
