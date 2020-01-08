import schedule from '../constants/schedule-opts';
import { getNextLoopedArrayItem } from './arrays';

export function calculateCurrentWeight(exerciseInfo, variant, history) {
  return 10;
}

export function calculateNextWarmupWeight(weight) {
  return weight * schedule.warmup['increment-factor'];
}

export function calculateStartingWarmupWeight(goalWeight) {
  return goalWeight * schedule.warmup['start-ratio'];
}

export function calculateCurrentReps(exerciseInfo, variant, history) {
  const possibleRepGroups = exerciseInfo[variant].sets;
  const { previousSets, previousReps } = history[0];
  const previousGroup = possibleRepGroups[
    possibleRepGroups
      .map(item => item.toString())
      .indexOf(previousSets.toString())
  ];

  if (history[previousGroup.length - 1].reps !== previousReps) {
    // we're in the same workout
    return previousReps;
  }
  // We've just started a new workout
  return getNextLoopedArrayItem(exerciseInfo[variant], previousGroup)[0];
}

export function shouldContinueWarmingUp(weight, goalWeight) {
  return weight < schedule.warmup.ratio * goalWeight;
}

export function calculateNextVariant(workoutCount, variant) {
  if ((workoutCount + 1) % schedule['variant-switch-count'] !== 0) {
    // stick with current variant unless we've reached the switch threshold.
    return variant;
  }

  // Get next variant, looping around.
  return getNextLoopedArrayItem(variant, schedule.variants);
}

export function saveToHistory(history, exercise, performance) {
  return {
    ...history,
    [exercise]: saveToLimitedLengthArray(
      performance,
      history[exercise],
      schedule.historyKeepLength,
    ),
  };
}
