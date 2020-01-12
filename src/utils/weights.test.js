import {
  calculateCurrentReps,
  calculateNextVariant,
  calculateCurrentWeight,
  calculateNextWarmupWeight,
  calculateStartingWarmupWeight,
  ceilWeightToX,
  shouldContinueWarmingUp,
  getOccurredFailures,
  reduceWeight,
  increaseWeight,
  tooManyFailures,
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

test('sets remain same when failure occurred', () => {
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
        success: false,
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
  )).toBe(8);
});

test('set changes with variant even if failure occurred', () => {
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
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: false,
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
  )).toBe(5);
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

test('next variant is the same', () => {
  expect(calculateNextVariant(34, 'A')).toBe('A');
  expect(calculateNextVariant(41, 'B')).toBe('B');
});

test('next variant is the same', () => {
  expect(calculateNextVariant(29, 'A')).toBe('B');
  expect(calculateNextVariant(59, 'B')).toBe('A');
});

test('saving to history works as expected', () => {
// saveToHistory

});

test('getting next weight works for a new workout', () => {
  expect(calculateCurrentWeight(
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
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: false,
      }],
  )).toBe(50);
});

test('getting next weight works for a new workout at end of the repgroups', () => {
  expect(calculateCurrentWeight(
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
        sets: [12, 12, 12],
        reps: 12,
        weight: 50,
        success: true,
      },
      {
        sets: [12, 12, 12],
        reps: 12,
        weight: 50,
        success: true,
      },
      {
        sets: [12, 12, 12],
        reps: 12,
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
        success: false,
      }],
  )).toBe(52.5);
});

test('getting next weight works for a new workout at end single group of the repgroups', () => {
  expect(calculateCurrentWeight(
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
      }],
  )).toBe(52.5);
});

test('getting next weight works for variant switch', () => {
  expect(calculateCurrentWeight(
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
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: false,
      }, {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 60,
        success: true,
      }],
  )).toBe(40);
});

test('getting next weight works zero increment exercise', () => {
  expect(calculateCurrentWeight(
    {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 0,
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
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: false,
      }, {
        sets: [5, 5, 5, 5, 5],
        reps: 5,
        weight: 60,
        success: true,
      }],
  )).toBe(50);
});


test('failures are counted in previous sets', () => {
  expect(getOccurredFailures(
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
        success: false,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
    ], 3,
  )).toBe(1);
});

test('failures are not counted in far history', () => {
  expect(getOccurredFailures(
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
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: true,
      },
      {
        sets: [8, 8, 8],
        reps: 8,
        weight: 50,
        success: false,
      },
    ], 3,
  )).toBe(0);
});

test('incrementing weight works well', () => {
  expect(increaseWeight(5, 1)).toBe(6);
  expect(increaseWeight(5, 0)).toBe(5);
  expect(increaseWeight(48, 2.5)).toBe(52.5);
});

test('decreasing weight works well', () => {
  expect(reduceWeight(5, 1)).toBe(4);
  expect(reduceWeight(5, 2.5)).toBe(5);
  expect(reduceWeight(55, 2.5)).toBe(45);
});

test('there are too many failures', () => {
  expect(tooManyFailures(5)).toBeTruthy();
});
test('there are not too many failures', () => {
  expect(tooManyFailures(3)).toBeFalsy();
  expect(tooManyFailures(0)).toBeFalsy();
});
