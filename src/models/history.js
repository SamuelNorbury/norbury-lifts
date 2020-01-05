import initState from '../store/history';

export default {
  /**
   *  Initial state
   */
  state: {
    history: initState.history,
  },

  /**
   * Reducers
   */
  reducers: {
    storePerformance: ({ history, ...state }, payload) => {
      if (payload.isWarmingUp) {
        return { ...state };
      }


      // Normal set completed
      return {
        ...state,
        history: history.slice(0, 5).unshift(payload.performance),
      };
    },
  },
};
