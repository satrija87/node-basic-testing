// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    let values = ['grandma', 'mom', 'me'];
    let linkedList = {
      value: 'grandma',
      next: {
        value: 'mom',
        next: {
          value: 'me',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(values)).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['grandfa', 'father', 'me'];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
