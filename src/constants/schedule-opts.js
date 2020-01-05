export default {
  'warmup-start-ratio': 0.5,
  'warmup-ratio': 0.7,
  'variant-switch-count': 30,
  variants: [
    'A',
    'B',
  ],

  workouts: {
    'legs-shoulders': {
      A: ['squat', 'overhead-press', 'rear-fly'],
      B: ['squat', 'overhead-press', 'rear-fly', 'lateral-raise'],

    },
    back: {
      A: ['deadlift', 'bent-over-row', 'chin-up'],
      B: ['deadlift', 'bent-over-row', 'chin-up', 'upright-row'],
    },
    chest: {
      A: ['barbell-benchpress', 'skull-crusher-super-set', 'dip'],
      B: ['dumbbell-benchpress', 'skull-crusher-super-set', 'dip', 'incline-barbell-benchpress'],
    },
  },

  exercises: {
    deadlift: {
      sets: {
        A: [[5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'barbell-benchpress': {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    squat: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'bent-over-row': {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'chin-up': {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[5, 5, 5, 5, 5]],
      },
      increments: 0,
    },
    'skull-crusher-super-set': {
      sets: {
        A: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'dumbbell-benchpress': {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2,
    },
    'rear-fly': {
      sets: {
        A: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2,
    },
    'lateral-raise': {
      sets: {
        A: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2,
    },
    'incline-barbell-benchpress': {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    dip: {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
    'upright-row': {
      sets: {
        A: [[5, 5, 5, 5, 5]],
        B: [[8, 8, 8], [10, 10, 10], [12, 12, 12]],
      },
      increments: 2.5,
    },
  },
};
