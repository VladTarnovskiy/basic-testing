// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const commentDataMock = {
    data: {
      postId: 3,
      id: 4,
      name: 'name',
      email: 'email',
      body: 'content',
    },
  };
  const baseURL = 'https://jsonplaceholder.typicode.com';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const mockAxios = jest.spyOn(axios, 'create');
    const mockFunc = jest.fn(async () => commentDataMock);

    mockAxios.mockReturnValue({
      get: mockFunc,
    } as never);

    await throttledGetDataFromApi('/comments/2');
    expect(mockAxios).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockFunc = jest.fn(async () => commentDataMock);

    const axiosMock = jest.spyOn(axios, 'create');
    axiosMock.mockReturnValue({
      get: mockFunc,
    } as never);

    await throttledGetDataFromApi('/comments/2');
    jest.runAllTimers();
    expect(mockFunc).toHaveBeenLastCalledWith('/comments/2');
  });

  test('should return response data', async () => {
    const mockFunc = jest.fn(() => commentDataMock);

    const axiosMock = jest.spyOn(axios, 'create');
    axiosMock.mockReturnValue({
      get: mockFunc,
    } as never);

    const responseData = await throttledGetDataFromApi('/comments/2');
    console.log(responseData);
    jest.runAllTimers();

    expect(responseData).toEqual(commentDataMock.data);
  });
});
