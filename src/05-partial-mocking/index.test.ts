// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let consoleFn: jest.SpyInstance;
  beforeEach(() => {
    consoleFn = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.unmock('./index');
    consoleFn.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleFn).not.toHaveBeenCalled();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const value = 'I am not mocked';
    unmockedFunction();
    expect(consoleFn).toHaveBeenCalledWith(value);
  });
});
