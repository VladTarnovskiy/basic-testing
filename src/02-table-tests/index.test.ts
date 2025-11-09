// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 2, action: '**', expected: null },
  { a: 'ert', b: 'ert', action: Action.Exponentiate, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test(`arguments ${a} and ${b} with action ${action} should return ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
