import { expect, describe, it } from 'vitest';
import { left, right, type Either } from './either.js';

function doSomething(x: boolean): Either<string, string> {
  if (x) {
    return right('sucess');
  } else {
    return left('error');
  }
}

describe('Either test', () => {
  it('success result', () => {
    const result = doSomething(true);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  });

  it('success result', () => {
    const result = doSomething(false);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
  });
});
