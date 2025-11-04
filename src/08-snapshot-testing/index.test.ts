// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
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

  test('should generate linked list from values 2', () => {
    const values = ['grandfa', 'father', 'me'];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
