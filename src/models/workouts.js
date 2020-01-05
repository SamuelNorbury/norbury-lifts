import initState from '../store/workouts';
import schedule from '../constants/schedule-opts';

export default {
  /**
   *  Initial state
   */
  state: {
    currentVariant: initState.variant,
    currentWorkout: initState.workout,
    currentSet: initState.set,
    currentExercise: initState.exercise,
    isWarmingUp: true,
    isFinished: false,
    hasStarted: false,
    history: initState.history,
    weight: initState.weight,
    currentWeight: initState.currentWeight,
  },

  /**
   * Reducers
   */
  reducers: {
    startWorkout: (state, payload) => ({
      ...state,
      isWarmingUp: false,
      hasStarted: true,
    }),

    startExercise: (state, payload) => ({
      ...state,
      isWarmingUp: true,
    }),

    completeWarmupSet: (state, payload) => {
      if (payload.performance.weight < 0.5 * state.weight) {
        // Another warmup set
        return {
          ...state,
          currentWeight: state.currentWeight * 1.2,
        };
      }
      // The real exercise begins.
      return {
        ...state,
        isWarmingUp: false,
        currentWeight: weight,
      };
    },


    completeSet: ({
      currentExercise, currentVariant, currentWorkout, currentSet, history, ...state
    }, payload) => {
      const currentWorkoutInfo = schedule.workouts[currentWorkout][currentVariant];
      const currentExerciseIndex = currentWorkoutInfo.indexOf(currentExercise);
      const currentExerciseInfo = schedule.exercise[currentExercise];
      const numberOfSets = currentExerciseInfo.sets[currentVariant].length;

      if (currentSet === numberOfSets) {
        if (currentExerciseIndex === currentWorkoutInfo.length) {
          // We reached the end of this workout.
          return {
            ...state,
            history: {
              ...history,
              // Save performance for future calculations
              [currentExercise]: payload.performance,
            },
            isFinished: true,
          };
        }

        // go to next exercise
        return {
          ...state,
          currentSet: 1,
          currentExercise: currentWorkoutInfo[currentExerciseIndex + 1],
          isWarmingUp: true,
          // Save performance for future calculations
          [currentExercise]: payload.performance,

        };
      }

      // Go to next set.
      return {
        ...state,
        currentSet: currentSet + 1,
        history: {
          ...history,
          [currentExercise]: payload.performance,
        },
      };
    },

    finishWorkout: (state, payload) => {
      const currentWorkoutInfo = schedule.workouts[currentWorkout][currentVariant];
      const currentExerciseIndex = currentWorkoutInfo.indexOf(currentExercise);
      return {
        ...state,
        isFinished: true,
        // Set next workout as current
        currentWorkout: schedule.workouts,
      };
    },
  },
};
