import initState from '../store/workouts';
import schedule from '../constants/schedule-opts';
import {
  calculateCurrentWeight,
  calculateCurrentReps,
  calculateStartingWarmupWeight,
  calculateNextWarmupWeight,
  shouldContinueWarmingUp,
  calculateNextVariant,
} from '../utils/weights';
import {
  getNextLoopedArrayItem,
  saveToLimitedLengthArray,
} from '../utils/arrays';

export default {
  /**
   *  Initial state
   */
  state: {
    // keep track of different aspects of training
    currentVariant: initState.variant,
    currentWorkout: initState.workout,
    currentSet: initState.set,
    currentExercise: initState.exercise,
    currentWeight: initState.currentWeight,
    workoutCount: initState.workoutCount,
    // The weight goal and reps
    goalWeight: initState.goalWeight,
    goalReps: initState.goalReps,
    // Our local DB
    history: initState.history,
    // bool to keep track of warmup state
    isWarmingUp: true,
    // bools to keep track of presentational state
    isFinished: false,
    hasStarted: false,
  },

  /**
   * Reducers
   */
  reducers: {
    startWorkout: ({
      currentWorkout,
      currentVariant,
      currentExercise,
      history,
      ...state
    }) => {
      const currentWorkoutInfo = schedule.workouts[currentWorkout][currentVariant];
      const currentExerciseInfo = schedule.exercise[currentExercise];

      return {
        ...state,
        isWarmingUp: false,
        hasStarted: true,
        isFinished: false,
        currentExercise: currentWorkoutInfo[0],
        goalWeight: calculateCurrentWeight(currentWorkoutInfo[0], history[currentExercise]),
        goalReps: calculateCurrentReps(
          currentExerciseInfo,
          currentVariant,
          history[currentExercise],
        ),
      };
    },

    startExercise: state => ({
      ...state,
      isWarmingUp: true,
      currentWeight: calculateStartingWarmupWeight(state.goalWeight),
    }),

    completeSet: ({
      isWarmingUp,
      currentWeight,
      goalWeight,
      currentExercise,
      currentVariant,
      currentWorkout,
      currentSet,
      history,
      ...state
    }, payload) => {
      if (isWarmingUp) {
        // Warmup set completed
        if (shouldContinueWarmingUp(payload.performance.weight, goalWeight)) {
          // continue warming up
          return {
            ...state,
            currentWeight: calculateNextWarmupWeight(state.currentWeight),
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
          currentExercise: getNextLoopedArrayItem(currentExercise, currentWorkoutInfo),
          isWarmingUp: true,
          history: saveToLimitedLengthArray(payload.performance, history[currentExercise], 5),
          goalWeight: calculateCurrentWeight(
            currentWorkoutInfo[currentExerciseIndex + 1],
            history[currentExercise],
          ),
          goalReps: calculateCurrentReps(
            currentExerciseInfo,
            currentVariant,
            history[currentExercise],
          ),
        };
      }

      // Go to next set.
      return {
        ...state,
        currentSet: currentSet + 1,
        history: saveToLimitedLengthArray(payload.performance, history[currentExercise], 5),
      };
    },

    finishWorkout: ({
      currentWorkout, currentVariant, currentExercise, workoutCount, ...state
    }) => ({
      ...state,
      isFinished: false,
      hasStarted: false,
      // Set next workout
      currentWorkout: getNextLoopedArrayItem(currentWorkout, Object.keys(schedule.workouts)),
      workoutCount: workoutCount + 1,
      variant: calculateNextVariant(workoutCount, state.variant),
    }),
  },
};
