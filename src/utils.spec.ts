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
  it('should return correct amount with negative value', () => {
    const nativeAmount = uiToNative(-1, 6);
    expect(nativeAmount.toString(10)).toEqual('-1000000');
  });
  it('should return correct amount with zero decimals', () => {
    const decimals = 0;
    const nativeAmount = uiToNative(15, decimals);
    expect(nativeAmount.toString(10)).toEqual('15');
  });
  it('should return correct amount with one decimals', () => {
    const decimals = 1;
    const nativeAmount = uiToNative(1.5, decimals);
    expect(nativeAmount.toString(10)).toEqual('15');
  });
  it('should return correct amount with 6 decimals', () => {
    const decimals = 6;
    const nativeAmount = uiToNative(0.0015, decimals);
    expect(nativeAmount.toString(10)).toEqual('1500');
  });
  it('should return correct amount converting back and forth', () => {
    const decimals = 6;
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
  it('should return correct amount with negative value', () => {
    const uiAmount = nativeToUi(new BN('-1000000'), 6);
    expect(uiAmount).toEqual(-1);
  });
  it('should return correct amount with zero decimals', () => {
    const decimals = 0;
    const uiAmount = nativeToUi(new BN('15'), decimals);
    expect(uiAmount).toEqual(15);
  });
  it('should return correct amount with one decimals', () => {
    const decimals = 1;
    const uiAmount = nativeToUi(new BN('15'), decimals);
    expect(uiAmount).toEqual(1.5);
  });
  it('should return correct amount with 6 decimals', () => {
    const decimals = 6;
    const uiAmount = nativeToUi(new BN('1500'), decimals);
    expect(uiAmount).toEqual(0.0015);
  });
  it('should return correct amount converting back and forth', () => {
    const decimals = 6;
    const nativeZeroes = '0'.repeat(decimals - 1);
    const nativeAmount = new BN('15' + nativeZeroes);
    const uiAmount = nativeToUi(nativeAmount, decimals);
    expect(uiToNative(uiAmount, decimals)).toEqual(nativeAmount);
  });
});
