import initState from '../store/workouts';

export default {
  /**
   *  Initial state
   */
  state: {
      currentVariant: initState.variant,
      currentWorkout: initState.workouts,
  },

  /**
   * Reducers
   */
  reducers: {
  },

  /**
   * Effects/Actions
   */
  effects: () => ({
  }),
};
