import { calculateCurrentReps } from './weights';
import schedule from '../constants/schedule-opts';

test('same set has same reps', () => {
  expect(calculateCurrentReps(
    {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'A',
    [
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {}, {}, {}, {}, {}, {}, {},
    ],
  )).toBe(5);
});

test('next workout has same sets because same variant', () => {
  expect(calculateCurrentReps(
    {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'A',
    [
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {}, {}, {}, {}, {}, {}, {},
    ],
  )).toBe(5);
});

test('variant switch', () => {
  expect(calculateCurrentReps(
    {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'B',
    [
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {}, {}, {}, {}, {}, {}, {},
    ],
  )).toBe(8);
});

test('mixed variant history', () => {
  expect(calculateCurrentReps(
    {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'B',
    [
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {}, {}, {}, {}, {}, {}, {},
    ],
  )).toBe(8);
});

test('set type switch in same variant', () => {
  expect(calculateCurrentReps(
    {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'B',
    [
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 50,
        success: true,
      },
      {}, {}, {}, {}, {}, {}, {},
    ],
  )).toBe(10);
});
