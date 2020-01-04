import initState from '../store/exercises';

export default {
  /**
   *  Initial state
   */
  state: {
      currentExercise: initState.exercises,
      currentSet: 0,
      setCount: 5,
      repcount: 5,
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
