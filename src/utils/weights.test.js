import {
  calculateCurrentReps,
  calculateNextWarmupWeight,
  calculateStartingWarmupWeight,
  ceilWeightToX,
  shouldContinueWarmingUp,
} from './weights';

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

test('warmup weight is calculated correctly', () => {
  expect(calculateNextWarmupWeight(5, 1)).toBe(6);
  expect(calculateNextWarmupWeight(5, 2)).toBe(6);
  expect(calculateNextWarmupWeight(5, 3)).toBe(6);
  expect(calculateNextWarmupWeight(5, 2.5)).toBe(7.5);
});

test('starting warmup weight is correct', () => {
  expect(calculateStartingWarmupWeight(5, 2.5)).toBe(2.5);
  expect(calculateStartingWarmupWeight(50, 2.5)).toBe(25);
  expect(calculateStartingWarmupWeight(50, 2)).toBe(26);
});

test('weight is rounded up correctly', () => {
  expect(ceilWeightToX(5, 6)).toBe(6);
  expect(ceilWeightToX(48.4817381, 2.5)).toBe(50);
  expect(ceilWeightToX(50, 0)).toBe(50);
  expect(ceilWeightToX(50, -1)).toBe(50);
});

test('should continue warming up', () => {
  expect(shouldContinueWarmingUp(5, 20)).toBeTruthy();
  expect(shouldContinueWarmingUp(8, 22.5)).toBeTruthy();
  expect(shouldContinueWarmingUp(15, 22.5)).toBeTruthy();
});

test('done warming up', () => {
  expect(shouldContinueWarmingUp(18, 20)).toBeFalsy();
  expect(shouldContinueWarmingUp(18, 22.5)).toBeFalsy();
  expect(shouldContinueWarmingUp(60, 22.5)).toBeFalsy();
});
