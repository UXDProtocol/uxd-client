import { BN } from 'bn.js';
import { nativeToUi, uiToNative } from './utils';

describe('uiToNative', () => {
  it('should return correct amount with regular value (1 native)', () => {
    const nativeAmount = uiToNative(0.000001, 6);
    expect(nativeAmount.toString(10)).toEqual('1');
  });
  it('should return correct amount with regular value (1 ui)', () => {
    const nativeAmount = uiToNative(1, 6);
    expect(nativeAmount.toString(10)).toEqual('1000000');
  });
  it('should return correct amount with one decimals', () => {
    const decimals = 1;
    const nativeAmount = uiToNative(1.5, decimals);
    expect(nativeAmount.toString(10)).toEqual('15');
  });
  it('should return correct amount with extremely large decimals', () => {
    const decimals = 200;
    const nativeAmount = uiToNative(1.5, decimals);
    const nativeZeroes = '0'.repeat(decimals - 1);
    expect(nativeAmount.toString(10)).toEqual('15' + nativeZeroes);
  });
  it('should return correct amount with extremely large numbers', () => {
    const decimals = 6;
    const magnitude = 100;
    const nativeLargeAmount = new BN('1' + '0'.repeat(magnitude + decimals));
    const uiLargeAmount = Math.pow(10, magnitude);
    expect(uiToNative(uiLargeAmount, decimals)).toEqual(nativeLargeAmount);
  });
  it('should return correct amount converting back and forth', () => {
    const decimals = 200;
    const uiAmount = 1.5;
    const nativeAmount = uiToNative(uiAmount, decimals);
    expect(nativeToUi(nativeAmount, decimals)).toEqual(uiAmount);
  });
});

describe('nativeToUi', () => {
  it('should return correct amount with regular value (1 native)', () => {
    const uiAmount = nativeToUi(new BN('1'), 6);
    expect(uiAmount).toEqual(0.000001);
  });
  it('should return correct amount with regular value (1 ui)', () => {
    const uiAmount = nativeToUi(new BN('1000000'), 6);
    expect(uiAmount).toEqual(1);
  });
  it('should return correct amount with one decimals', () => {
    const decimals = 1;
    const uiAmount = nativeToUi(new BN('15'), decimals);
    expect(uiAmount).toEqual(1.5);
  });
  it('should return correct amount with extremely large decimals', () => {
    const decimals = 200;
    const nativeZeroes = '0'.repeat(decimals - 1);
    const uiAmount = nativeToUi(new BN('15' + nativeZeroes), decimals);
    expect(uiAmount).toEqual(1.5);
  });
  it('should return correct amount with extremely large numbers', () => {
    const decimals = 6;
    const magnitude = 100;
    const nativeLargeAmount = new BN('1' + '0'.repeat(magnitude + decimals));
    const uiLargeAmount = Math.pow(10, magnitude);
    expect(nativeToUi(nativeLargeAmount, decimals)).toEqual(uiLargeAmount);
  });
  it('should return correct amount converting back and forth', () => {
    const decimals = 200;
    const nativeZeroes = '0'.repeat(decimals - 1);
    const nativeAmount = new BN('15' + nativeZeroes);
    const uiAmount = nativeToUi(nativeAmount, decimals);
    expect(uiToNative(uiAmount, decimals)).toEqual(nativeAmount);
  });
});
