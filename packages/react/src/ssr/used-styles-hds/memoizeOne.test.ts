import memoizeOne from './memoizeOne';

describe('memoizeOne', () => {
  it('returns cached value when arguments stay the same', () => {
    const fn = jest.fn((a: number, b: number) => a + b);
    const memoized = memoizeOne(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('recomputes when any argument changes', () => {
    const fn = jest.fn((value: string) => value.toUpperCase());
    const memoized = memoizeOne(fn);

    expect(memoized('a')).toBe('A');
    expect(memoized('b')).toBe('B');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('compares arguments with Object.is semantics', () => {
    const fn = jest.fn((value: number) => value);
    const memoized = memoizeOne(fn);

    memoized(Number.NaN);
    memoized(Number.NaN);
    memoized(-0);
    memoized(0);

    expect(fn).toHaveBeenCalledTimes(3);
  });
});
