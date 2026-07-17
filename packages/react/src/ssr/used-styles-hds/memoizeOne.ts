const areArgumentsEqual = (nextArgs: readonly unknown[], previousArgs: readonly unknown[]): boolean => {
  if (nextArgs.length !== previousArgs.length) {
    return false;
  }

  for (let i = 0; i < nextArgs.length; i += 1) {
    if (!Object.is(nextArgs[i], previousArgs[i])) {
      return false;
    }
  }

  return true;
};

const memoizeOne = <TArgs extends readonly unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): ((...args: TArgs) => TResult) => {
  let hasCachedResult = false;
  let previousArgs: readonly unknown[] = [];
  let previousResult: TResult;

  const memoized = (...args: TArgs): TResult => {
    if (!hasCachedResult || !areArgumentsEqual(args, previousArgs)) {
      previousResult = fn(...args);
      previousArgs = args;
      hasCachedResult = true;
    }

    return previousResult;
  };

  return memoized;
};

export default memoizeOne;
