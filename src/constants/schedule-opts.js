export default {
  warmup: {
    startRatio: 0.5,
    ratio: 0.7,
    incrementFactor: 1.2,
  },
  variantSwitchCount: 30,
  historyKeepLength: 15,
  weightReductionFactor: 0.8,
  failureRatio: 4,

  variants: [
    'A',
    'B',
  ],

  workouts: {
    legsShoulders: {
      A: ['squat', 'overheadPress', 'rearFly'],
      B: ['squat', 'overheadPress', 'rearFly', 'lateralRaise'],

    },
    back: {
      A: ['deadlift', 'bentOverRow', 'chinUp'],
      B: ['deadlift', 'bentOverRow', 'chinUp', 'uprightRow'],
    },
    chest: {
      A: ['barbellBenchpress', 'skullCrusherSuperSet', 'dip'],
      B: ['dumbbellBenchpress', 'skullCrusherSuperSet', 'dip', 'inclineBarbellBenchpress'],
    },
  },

  exercises: {
    deadlift: {
      sets: {
        A: [[5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 20,
    },
    barbellBenchpress: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 20,
    },
    squat: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 20,
    },
    bentOverRow: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 20,
    },
    chinUp: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[5, 5, 5, 5, 5]],
      },
      increments: 0,
      startingWeight: 0,
    },
    skullCrusherSuperSet: {
      sets: {
        A: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 10,
    },
    dumbbellBenchpress: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2,
      startingWeight: 8,
    },
    rearFly: {
      sets: {
        A: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2,
      startingWeight: 4,
    },
    lateralRaise: {
      sets: {
        A: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2,
      startingWeight: 2,
    },
    inclineBarbellBenchpress: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 20,
    },
    dip: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 0,
    },
    uprightRow: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 10,
    },
    overheadPress: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
      startingWeight: 10,
    },
  },
};
