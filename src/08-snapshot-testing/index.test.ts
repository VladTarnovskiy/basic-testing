// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const resultList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: null,
        next: null,
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, 2, 3]);
    expect(list).toStrictEqual(resultList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([2, 3, 4]);
    expect(list).toMatchSnapshot();
  });
});
