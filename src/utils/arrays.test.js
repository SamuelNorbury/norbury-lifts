import { getNextLoopedArrayItem, getTheDamnIndex, saveToLimitedLengthArray } from './arrays';

test('simple array lookup', () => {
  expect(getTheDamnIndex(
    [1, 3, 4], 1,
  )).toBe(0);
});

test('arrays in arrays', () => {
  expect(getTheDamnIndex(
    [[1, 3, 4], [1]], [1],
  )).toBe(1);
});

test('strings in arrays in arrays', () => {
  expect(getTheDamnIndex(
    [['nah', 'maybe'], ['bla']], ['nah', 'maybe'],
  )).toBe(0);
});

test('ints in arrays in array', () => {
  expect(
    getTheDamnIndex(
      [
        ['5', '6'],
        ['7'],
      ],
      ['5', '6'],
    ),
  ).toBe(0);
});

test('next item is simply the next item', () => {
  expect(getNextLoopedArrayItem([5, 6, 7], 5)).toBe(6);
});

test('next item is looped', () => {
  expect(getNextLoopedArrayItem([5, 6, 7], 7)).toBe(5);
});

test('next item is not simple', () => {
  expect(
    getNextLoopedArrayItem(
      [
        ['5', '6'],
        ['7'],
      ],
      ['5', '6'],
    ),
  ).toEqual(['7']);
});

test('saves to shorter array', () => {
  expect(saveToLimitedLengthArray([1, 2, 3], 1, 5))
    .toEqual([1, 1, 2, 3]);
});

test('saves to limit array', () => {
  expect(saveToLimitedLengthArray([1, 2, 3, 4], 1, 5))
    .toEqual([1, 1, 2, 3, 4]);
});

test('saves to empty array', () => {
  expect(saveToLimitedLengthArray([], 1, 5))
    .toEqual([1]);
});

test('limits the length', () => {
  expect(saveToLimitedLengthArray([1, 2, 3, 4, 5], 1, 5))
    .toEqual([1, 1, 2, 3, 4]);
});
