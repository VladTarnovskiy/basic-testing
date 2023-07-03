// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 2, action: '**', expected: null },
  { a: 'ert', b: 'ert', action: Action.Exponentiate, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });
  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });
});
