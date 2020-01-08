import initState from '../store/workouts';
import schedule from '../constants/schedule-opts';
import {
  calculateCurrentWeight,
  calculateCurrentReps,
  saveToHistory,
  calculateStartingWarmupWeight,
  calculateNextWarmupWeight,
  shouldContinueWarmingUp,
  calculateNextVariant,
} from '../utils/weights';

import {
  getNextLoopedArrayItem,
} from '../utils/arrays';

export default {
  /**
   *  Initial state
   */
  state: {
    // keep track of different aspects of training
    currentVariant: initState.variant,
    currentWorkout: initState.workout,
    currentSetIndex: initState.set,
    currentExercise: initState.exercise,
    currentWeight: initState.currentWeight,
    workoutCount: initState.workoutCount,
    numberOfSets: initState.numberOfSets,
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
        goalWeight: calculateCurrentWeight(
          currentExerciseInfo,
          currentVariant,
          history[currentExercise],
        ),
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
      currentSetIndex,
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

      if (currentSetIndex === numberOfSets) {
        if (currentExerciseIndex + 1 === currentWorkoutInfo.length) {
          // We reached the end of this workout.
          return {
            ...state,
            isFinished: true,
          };
        }

        // go to next exercise
        const nextExercise = getNextLoopedArrayItem(currentExercise, currentWorkoutInfo);

        return {
          ...state,
          currentSetIndex: 1,
          currentExercise: nextExercise,
          isWarmingUp: true,
          history: saveToHistory(
            history,
            currentExercise,
            payload.performance,
          ),
          goalWeight: calculateCurrentWeight(
            schedule.exercise[nextExercise],
            currentVariant,
            history[nextExercise],
          ),
          goalReps: calculateCurrentReps(
            schedule.exercise[nextExercise],
            currentVariant,
            history[nextExercise],
          ),
        };
      }

      // Go to next set.
      return {
        ...state,
        currentSetIndex: currentSetIndex + 1,
        history: saveToHistory(
          history,
          currentExercise,
          payload.performance,
        ),

      };
    },

    finishWorkout: ({
      currentWorkout, currentVariant, currentExercise, workoutCount, ...state
    }) => {
      const nextWorkout = getNextLoopedArrayItem(currentWorkout, Object.keys(schedule.workouts));
      const nextVariant = calculateNextVariant(workoutCount, state.variant);

      return {
        ...state,
        isFinished: false,
        hasStarted: false,
        // Set next workout
        currentWorkout: nextWorkout,
        currentExercise: schedule.workouts[nextWorkout][nextVariant],
        workoutCount: workoutCount + 1,
        variant: nextVariant,
      };
    },
  },
};
