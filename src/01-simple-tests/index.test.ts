// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({
      a: 3,
      b: 4,
      action: Action.Add,
    });
    expect(res).toBe(7);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({
      a: 13,
      b: 4,
      action: Action.Subtract,
    });
    expect(res).toBe(9);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({
      a: 3,
      b: 4,
      action: Action.Multiply,
    });
    expect(res).toBe(12);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({
      a: 25,
      b: 5,
      action: Action.Divide,
    });
    expect(res).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(res).toBe(125);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({
      a: 3,
      b: 4,
      action: 'sin',
    });
    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({
      a: '2',
      b: 'r',
      action: Action.Multiply,
    });
    expect(res).toBeNull();
  });
});
