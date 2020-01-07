export function getNextLoopedArrayItem(item, array) {
  return array[(array.indexOf(item) + 1) % array.length];
}

export function saveToLimitedLengthArray(item, array, length) {
  array.unshift(item);
  return array.slice(0, length);
}
