export function getNextLoopedArrayItem(array, item) {
  let index = array.indexOf(item);
  if (index === -1) {
    index = getTheDamnIndex(array, item);
  }
  return array[(index + 1) % array.length];
}

export function getTheDamnIndex(array, item) {
  return array
    .map(i => i.toString())
    .indexOf(item.toString());
}

export function saveToLimitedLengthArray(array, item, length) {
  array.unshift(item);
  return array.slice(0, length);
}
