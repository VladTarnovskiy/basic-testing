// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockedTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);
    expect(mockedTimeout).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const mockedTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);
    expect(mockedTimeout).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockedTimeout = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 4000);
    expect(mockedTimeout).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 4000);
    jest.advanceTimersByTime(8000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mock = jest.spyOn(path, 'join');
    await readFileAsynchronously('./file.txt');
    jest.advanceTimersByTime(4000);
    expect(mock).toHaveBeenLastCalledWith(__dirname, './file.txt');
  });

  test('should return null if file does not exist', async () => {
    const content = await readFileAsynchronously('./file-not-exist.txt');
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // const content = await readFileAsynchronously('./file.txt');
    // expect(content).toBe('Text');
  });
});
