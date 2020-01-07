import schedule from '../constants/schedule-opts';
import { getNextLoopedArrayItem } from './arrays';

export function calculateCurrentWeight(workoutInfo, history) {
  return 10;
}

export function calculateNextWarmupWeight(currentWeight) {
  return currentWeight * schedule.warmup['increment-factor'];
}

export function calculateStartingWarmupWeight(goalWeight) {
  return goalWeight * schedule.warmup['start-ratio'];
}

export function calculateCurrentReps(exerciseInfo, variant, history) {
  return 5;
}

export function shouldContinueWarmingUp(currentWeight, goalWeight) {
  return currentWeight < schedule.warmup.ratio * goalWeight;
}

export function calculateNextVariant(workoutCount, currentVariant) {
  if ((workoutCount + 1) % schedule['variant-switch-count'] !== 0) {
    // stick with current variant unless we've reached the switch threshold.
    return currentVariant;
  }

  // Get next variant, looping around.
  return getNextLoopedArrayItem(currentVariant, schedule.variants);
}
