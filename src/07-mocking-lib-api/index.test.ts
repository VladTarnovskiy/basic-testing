// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const commentDataMock = {
    postId: 1,
    id: 2,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
  };

  const baseUrl = 'https://jsonplaceholder.typicode.com';
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockAxios = jest.spyOn(axios, 'create');

    mockAxios.mockReturnValue({
      get: async () => ({ commentDataMock }),
    } as never);

    await throttledGetDataFromApi('/comments/2');
    expect(mockAxios).toHaveBeenCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockFunc = jest.fn(async () => ({ commentDataMock }));

    const axiosMock = jest.spyOn(axios, 'create');
    axiosMock.mockReturnValue({
      get: mockFunc,
    } as never);

    await throttledGetDataFromApi('/comments/2');
    jest.runAllTimers();

    expect(mockFunc).toHaveBeenLastCalledWith('/comments/2');
  });

  test('should return response data', async () => {
    const content = await throttledGetDataFromApi('/comments/2');
    expect(JSON.stringify(commentDataMock)).toBe(JSON.stringify(content));
  });
});
