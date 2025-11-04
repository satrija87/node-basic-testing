// Uncomment the code below and write your tests

import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 4, action: Action.Add, expected: 7 },
  { a: 13, b: 4, action: Action.Subtract, expected: 9 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 3, b: 4, action: 'sin', expected: null },
  { a: '2', b: 'r', action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should calculate properly with two parameters:a and b`,
    ({ a, b, action, expected }) => {
      const res = simpleCalculator({ a, b, action });
      expect(res).toBe(expected);
    },
  );
});
