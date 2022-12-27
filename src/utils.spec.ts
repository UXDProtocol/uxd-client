import { BN } from 'bn.js';
import { nativeToUi, uiToNative } from './utils';

describe('nativeToUi', () => {
  it('should return correct amount with regular value (1 native)', () => {
    const uiAmount = nativeToUi(new BN('1'), 6);
    expect(uiAmount).toEqual(0.000001);
  });
  it('should return correct amount with regular value (1 ui)', () => {
    const uiAmount = nativeToUi(new BN('1000000'), 6);
    expect(uiAmount).toEqual(1);
  });
  it('should return correct amount with extremely large value', () => {
    const decimals = 64;
    const nativeZeroes = '0'.repeat(decimals - 1);
    const uiAmount = nativeToUi(new BN('15' + nativeZeroes), decimals);
    expect(uiAmount).toEqual(1.5);
  });
  it('should return correct amount converting back and forth', () => {
    const decimals = 64;
    const nativeZeroes = '0'.repeat(decimals - 1);
    const nativeAmount = new BN('15' + nativeZeroes);
    const uiAmount = nativeToUi(nativeAmount, decimals);
    expect(uiToNative(uiAmount, decimals)).toEqual(nativeAmount);
  });
});

describe('uiToNative', () => {
  it('should return correct amount with regular value (1 native)', () => {
    const nativeAmount = uiToNative(0.000001, 6);
    expect(nativeAmount.toString(10)).toEqual('1');
  });
  it('should return correct amount with regular value (1 ui)', () => {
    const nativeAmount = uiToNative(1, 6);
    expect(nativeAmount.toString(10)).toEqual('1000000');
  });
  it('should return correct amount with extremely large value', () => {
    const decimals = 64;
    const nativeAmount = uiToNative(1.5, decimals);
    const nativeZeroes = '0'.repeat(decimals - 1);
    expect(nativeAmount.toString(10)).toEqual('15' + nativeZeroes);
  });
  it('should return correct amount converting back and forth', () => {
    const decimals = 64;
    const uiAmount = 1.5;
    const nativeAmount = uiToNative(uiAmount, decimals);
    expect(nativeToUi(nativeAmount, decimals)).toEqual(uiAmount);
  });
});
