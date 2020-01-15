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
    startWorkout: (state) => {
      const currentWorkoutInfo = schedule.workouts[state.currentWorkout][state.currentVariant];
      const currentExercise = currentWorkoutInfo[0];
      const currentExerciseInfo = schedule.exercises[currentExercise];

      return {
        ...state,
        isWarmingUp: false,
        hasStarted: true,
        isFinished: false,
        currentExercise,
        currentSetFormat: currentExerciseInfo.sets[state.currentVariant],
        goalWeight: calculateCurrentWeight(
          currentExerciseInfo,
          state.currentVariant,
          state.history[currentExercise],
        ),
        goalReps: calculateCurrentReps(
          currentExerciseInfo,
          state.currentVariant,
          state.history[currentExercise],
        ),
      };
    },

    startExercise: state => ({
      ...state,
      isWarmingUp: true,
      currentWeight: calculateStartingWarmupWeight(state.goalWeight),
    }),

    completeSet: (state, payload) => {
      if (state.isWarmingUp) {
        // Warmup set completed
        if (shouldContinueWarmingUp(payload.performance.weight, state.goalWeight)) {
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

      const currentWorkoutInfo = schedule.workouts[state.currentWorkout][state.currentVariant];
      const currentExerciseIndex = currentWorkoutInfo.indexOf(state.currentExercise);
      const currentExerciseInfo = schedule.exercises[state.currentExercise];
      const numberOfSets = currentExerciseInfo.sets[state.currentVariant].length;

      if (state.currentSetIndex + 1 === numberOfSets) {
        if (currentExerciseIndex + 1 === currentWorkoutInfo.length) {
          // We reached the end of this workout.
          return {
            ...state,
            isFinished: true,
          };
        }

        // go to next exercise
        const nextExercise = getNextLoopedArrayItem(currentWorkoutInfo, state.currentExercise);

        return {
          ...state,
          currentSetIndex: 0,
          currentExercise: nextExercise,
          isWarmingUp: true,
          currentSetFormat: schedule.exercises[nextExercise].sets[state.currentVariant],
          history: saveToHistory(
            state.history,
            state.currentExercise,
            payload.performance,
          ),
          goalWeight: calculateCurrentWeight(
            schedule.exercises[nextExercise],
            state.currentVariant,
            state.history[nextExercise],
          ),
          goalReps: calculateCurrentReps(
            schedule.exercises[nextExercise],
            state.currentVariant,
            state.history[nextExercise],
          ),
        };
      }

      // Go to next set.
      return {
        ...state,
        currentSetIndex: state.currentSetIndex + 1,
        history: saveToHistory(
          state.history,
          state.currentExercise,
          payload.performance,
        ),

      };
    },

    finishWorkout: (state) => {
      const nextWorkout = getNextLoopedArrayItem(
        state.currentWorkout,
        Object.keys(schedule.workouts),
      );
      const nextVariant = calculateNextVariant(state.workoutCount, state.currentVariant);

      return {
        ...state,
        isFinished: false,
        hasStarted: false,
        // Set next workout
        currentWorkout: nextWorkout,
        currentExercise: schedule.workouts[nextWorkout][nextVariant],
        workoutCount: state.workoutCount + 1,
        variant: nextVariant,
      };
    },
  },
};
