// Uncomment the code below and write your tests

import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

const mockData = { data: { id: 1, title: 'example' } };
const path = '/posts/1';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    getMock = jest.fn().mockResolvedValue({ data: mockData });
    jest
      .spyOn(axios, 'create')
      .mockImplementation(() => ({ get: getMock }) as unknown as AxiosInstance);
  });

  test('should create axios instance with correct baseURL', async () => {
    const res = await throttledGetDataFromApi(path);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(res).toEqual(mockData);
  });

  test('should call get with correct URL', async () => {
    await throttledGetDataFromApi(path);
    expect(getMock).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi(path);
    expect(res).toEqual(mockData);
  });
});
