const binarySearchFn = (array: number[], target: number): number => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];

    if (midValue === target) return mid;
    else if (target < midValue) right = mid - 1;
    else left = mid + 1;
  }

  return -1;
};

const sortedNumbers = [2, 5, 7, 8, 11, 12, 50, 89, 99, 23, 90].sort(
  (a, b) => a - b
);
const foundIndexInSorted = binarySearchFn(sortedNumbers, 12);
console.log(foundIndexInSorted);
