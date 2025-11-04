// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');
    let delay = 1000;
    doStuffByTimeout(callback, delay);
    expect(spy).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    let delay = 1000;

    doStuffByTimeout(callback, delay);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
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
    const callback = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');
    let delay = 1000;
    doStuffByInterval(callback, delay);
    expect(spy).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    let delay = 1000;
    doStuffByInterval(callback, delay);
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const file = 'example.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const joinSpy = jest.spyOn(path, 'join').mockReturnValue('joined/file.txt');
    await readFileAsynchronously(file);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('nofile.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('Hello world!'));
    jest.spyOn(path, 'join').mockReturnValue('joined/path/file.txt');

    const result = await readFileAsynchronously('file.txt');

    expect(fsPromises.readFile).toHaveBeenCalledWith('joined/path/file.txt');
    expect(result).toBe('Hello world!');
  });
});
