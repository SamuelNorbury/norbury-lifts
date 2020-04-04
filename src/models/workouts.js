import initState from '../store/workouts';
import schedule from '../constants/schedule-opts';
import {
  calculateGoalWeight,
  calculateCurrentSetFormat,
  saveToHistory,
  calculateStartingWarmupWeight,
  calculateNextWarmupWeight,
  shouldContinueWarmingUp,
  calculateNextVariant,
} from '../utils/weights';

import {
  getNextLoopedArrayItem,
  getTheDamnIndex,
} from '../utils/arrays';

export default {
  /**
   *  Initial state
   */
  state: {
    // keep track of different aspects of current training
    variant: initState.variant,
    workout: initState.workout,
    set: initState.set,
    exercise: initState.exercise,
    numberOfSets: initState.numberOfSets,
    weight: initState.weight,
    reps: initState.reps,
    setFormat: initState.setFormat,

    // The weight goal
    goalWeight: initState.goalWeight,

    // Our local DB
    workoutCount: initState.workoutCount,
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
      const exercise = schedule.workouts[state.workout][state.variant][0];
      const exerciseInfo = schedule.exercises[exercise];
      const setFormat = calculateCurrentSetFormat(
        exerciseInfo,
        state.variant,
        state.history[exercise],
      );

      return {
        ...state,
        isWarmingUp: false,
        hasStarted: true,
        isFinished: false,
        exercise,
        setFormat,
        numberOfSets: setFormat.length,
        set: 0,
        goalWeight: calculateGoalWeight(
          exerciseInfo,
          state.variant,
          state.history[exercise],
        ),
        reps: setFormat[0],
      };
    },

    startExercise: state => ({
      ...state,
      isWarmingUp: true,
      weight: calculateStartingWarmupWeight(
        state.goalWeight,
        schedule.exercises[state.exercise].increments,
      ),
    }),

    completeSet: (state, payload) => {
      if (state.isWarmingUp) {
        // Warmup set completed
        if (shouldContinueWarmingUp(payload.weight, state.goalWeight)) {
          // continue warming up
          return {
            ...state,
            weight: calculateNextWarmupWeight(
              state.weight,
              schedule.exercises[state.exercise].increments,
            ),
          };
        }
        // end warmup and go to real workout.
        return {
          ...state,
          weight: state.goalWeight,
          isWarmingUp: false,
        };
      }

      const listOfExercisesInWorkout = schedule.workouts[state.workout][state.variant];
      const exerciseIndex = getTheDamnIndex(listOfExercisesInWorkout, state.exercise);

      if (state.set + 1 >= state.setFormat.length) {
        if (exerciseIndex + 1 >= listOfExercisesInWorkout.length) {
          // We reached the end of this workout.
          return {
            ...state,
            isFinished: true,
            history: saveToHistory(
              state.history,
              state.exercise,
              payload,
            ),
          };
        }

        // go to next exercise
        const nextExercise = getNextLoopedArrayItem(listOfExercisesInWorkout, state.exercise);
        const goalWeight = calculateGoalWeight(
          schedule.exercises[nextExercise],
          state.variant,
          state.history[nextExercise],
        );

        const nextSetFormat = calculateCurrentSetFormat(
          schedule.exercises[nextExercise],
          state.variant,
          state.history[nextExercise],
        );

        return {
          ...state,
          set: 0,
          exercise: nextExercise,
          isWarmingUp: true,
          setFormat: nextSetFormat,
          weight: calculateStartingWarmupWeight(
            goalWeight,
            schedule.exercises[nextExercise].increments,
          ),
          reps: nextSetFormat[0],
          history: saveToHistory(
            state.history,
            state.exercise,
            payload,
          ),
          goalWeight,
        };
      }

      // Go to next set.
      return {
        ...state,
        set: state.set + 1,
        history: saveToHistory(
          state.history,
          state.exercise,
          payload,
        ),

      };
    },

    finishWorkout: (state) => {
      const nextWorkout = getNextLoopedArrayItem(
        Object.keys(schedule.workouts),
        state.workout,
      );
      const nextVariant = calculateNextVariant(state.workoutCount, state.variant);

      return {
        ...state,
        isFinished: false,
        hasStarted: false,
        // Set next workout
        workout: nextWorkout,
        exercise: schedule.workouts[nextWorkout][nextVariant],
        workoutCount: state.workoutCount + 1,
        variant: nextVariant,
      };
    },

    importProgress: (state, progress) => ({
      ...state,
      history: progress,
    }),
  },
};
