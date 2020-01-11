import schedule from '../constants/schedule-opts';
import { getTheDamnIndex, getNextLoopedArrayItem } from './arrays';

export function calculateCurrentWeight(exerciseInfo, variant, history) {
  const possibleRepGroups = exerciseInfo.sets[variant];
  const { weight: previousWeight, sets: previousSets, reps: previousReps } = history[0];
  const foundIndex = getTheDamnIndex(possibleRepGroups, previousSets);

  if (foundIndex === -1) {
    // New variant that we've never seen before
    return reduceWeight(previousWeight, exerciseInfo.increments);
  }

  const previousGroup = possibleRepGroups[foundIndex];

  if (history[previousGroup.length - 1].reps !== previousReps) {
    // we're in the same workout
    return previousWeight;
  }

  // We've just started a new workout
  // check for failures in the previous workout
  if (!getOccurredFailures(history, previousGroup.length)) {
    return increaseWeight(previousWeight, exerciseInfo.increments);
  }

  // check the whole history for a really bad plateau
  if (tooManyFailures(getOccurredFailures(history, history.length))) {
  // we're having bad time, reduce and regroup.
    return reduceWeight(previousWeight, exerciseInfo.increments);
  }
  // we failed less than once per training in the last three trainings.
  return previousWeight;
}

export function calculateNextWarmupWeight(weight, increments) {
  return ceilWeightToX(weight * schedule.warmup.incrementFactor, increments);
}

export function calculateStartingWarmupWeight(goalWeight, increments) {
  return ceilWeightToX(goalWeight * schedule.warmup.startRatio, increments);
}

export function calculateCurrentReps(exerciseInfo, variant, history) {
  const possibleRepGroups = exerciseInfo.sets[variant];
  const { sets: previousSets, reps: previousReps } = history[0];
  const foundIndex = getTheDamnIndex(possibleRepGroups, previousSets);

  if (foundIndex === -1) {
    // New variant that we've never seen before
    return exerciseInfo.sets[variant][0][0];
  }

  const previousGroup = possibleRepGroups[foundIndex];

  if (history[previousGroup.length - 1].reps !== previousReps || getOccurredFailures(history, previousGroup.length)) {
    // we're in the same workout
    // or we previously failed a set
    return previousReps;
  }

  // We've just started a new workout
  return getNextLoopedArrayItem(exerciseInfo.sets[variant], previousGroup)[0];
}

export function shouldContinueWarmingUp(weight, goalWeight) {
  return weight < schedule.warmup.ratio * goalWeight;
}

export function calculateNextVariant(workoutCount, variant) {
  if ((workoutCount + 1) % schedule.variantSwitchCount !== 0) {
    // stick with current variant unless we've reached the switch threshold.
    return variant;
  }

  // Get next variant, looping around.
  return getNextLoopedArrayItem(schedule.variants, variant);
}

export function saveToHistory(history, exercise, performance) {
  return {
    ...history,
    [exercise]: saveToLimitedLengthArray(
      history[exercise],
      performance,
      schedule.historyKeepLength,
    ),
  };
}

export function ceilWeightToX(weight, x) {
  if (x < 1) {
    x = 1;
  }
  return Math.ceil(weight / x) * x;
}

export function getOccurredFailures(history, length) {
  return history.slice(0, length).reduce((carry, item) => {
    carry += item.success ? 0 : 1;
    return carry;
  }, 0);
}

export function reduceWeight(weight, increments) {
  return ceilWeightToX(weight * schedule.weightReductionFactor, increments);
}

export function increaseWeight(weight, increments) {
  return ceilWeightToX(weight + increments, increments);
}

export function tooManyFailures(failureCount) {
  return failureCount >= schedule.failureRatio;
}
