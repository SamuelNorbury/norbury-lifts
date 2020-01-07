import schedule from '../constants/schedule-opts';

export default {
  variant: schedule.variants[0],
  workout: 'legs-shoulders',
  set: 1,
  exercise: schedule.workout['legs-shoulders'][0],
  goalWeight: 30,
  history: Object.keys(schedule.exercises).reduce((obj, item) => {
    obj[item] = [];
    return obj;
  }, {}),
  workoutCount: 0,
};
