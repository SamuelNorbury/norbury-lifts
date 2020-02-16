import schedule from '../constants/schedule-opts';

export default (() => {
  const variant = schedule.variants[0];
  const workout = Object.keys(schedule.workouts)[0];
  const exercise = schedule.workouts[workout][variant][0];
  const history = Object.keys(schedule.exercises).reduce((obj, item) => {
    // eslint-disable-next-line
    obj[item] = Array.from({ length: schedule.historyKeepLength }, () => new Object());
    return obj;
  }, {});

  return {
    variant,
    workout,
    set: 0,
    exercise,
    goalWeight: 0,
    goalReps: 0,
    history,
    workoutCount: 0,
    numberOfSets: schedule.exercises[exercise].sets[variant][0].length,
  };
})();
