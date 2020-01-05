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
    currentWeight: initState.currentWeight,
    goalWeight: initState.goalWeight,
  },

  /**
   * Reducers
   */
  reducers: {
    startWorkout: state => ({
      ...state,
      isWarmingUp: false,
      hasStarted: true,
      currentExercise:
      goalWeight: calculateCurrentWeight(currentWorkoutInfo[currentExerciseIndex + 1], history),
    }),

    startExercise: state => ({
      ...state,
      isWarmingUp: true,
      currentWeight: state.goalWeight * schedule['warmup-start-ratio'],
    }),

    completeSet: ({
      isWarmingUp, currentWeight, goalWeight,
      currentExercise, currentVariant, currentWorkout, currentSet, ...state
    }) => {
      if (isWarmingUp) {
      // Warmup set completed
        if (payload.performance.weight < schedule['warmup-ratio'] * weight) {
          // continue warming up
          return {
            ...state,
            currentWeight: state.currentWeight * 1.2,
          };
        }
        // end warmup and go to real workout.
        return {
          ...state,
          currentWeight: state.goalWeight,
          isWarmingUp: false,
        };
      }

      const currentWorkoutInfo = schedule.workouts[currentWorkout][currentVariant];
      const currentExerciseIndex = currentWorkoutInfo.indexOf(currentExercise);
      const currentExerciseInfo = schedule.exercise[currentExercise];
      const numberOfSets = currentExerciseInfo.sets[currentVariant].length;

      if (currentSet === numberOfSets) {
        if (currentExerciseIndex + 1 === currentWorkoutInfo.length) {
          // We reached the end of this workout.
          return {
            ...state,
            isFinished: true,
          };
        }

        // go to next exercise
        return {
          ...state,
          currentSet: 1,
          currentExercise: currentWorkoutInfo[currentExerciseIndex + 1],
          isWarmingUp: true,
          history: history.slice(0, 5).unshift(payload.performance),
          goalWeight: calculateCurrentWeight(currentWorkoutInfo[currentExerciseIndex + 1], history),
        };
      }

      // Go to next set.
      return {
        ...state,
        currentSet: currentSet + 1,
      };
    },

    finishWorkout: ({
      currentWorkout, currentVariant, currentExercise, ...state
    }) => {
      const workoutsInOrder = Object.keys(schedule.workouts);
      const currentWorkoutIndex = workoutsInOrder.indexOf(currentWorkout);

      if (currentWorkoutIndex + 1 === workoutsInOrder.length) {
        return {
          ...state,
          isFinished: false,
          // Set next workout, starting from the first again
          currentWorkout: workoutsInOrder[0],
        };
      }

      return {
        ...state,
        isFinished: false,
        // Set next workout
        currentWorkout: workoutsInOrder[currentWorkoutIndex + 1],
      };
    },
  },
};
