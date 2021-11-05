import {ReversePipe} from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('abcABC')).toEqual('CBAcba');
  });

  it('should return null if input is null', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform(null)).toBeNull();
  });

  it('should return undefined if input is undefined', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform(undefined)).toEqual(undefined);
  });

});
