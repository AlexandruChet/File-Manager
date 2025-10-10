var binarySearchFn = function (array, target) {
  var left = 0;
  var right = array.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    var midValue = array[mid];
    if (midValue === target) return mid;
    else if (target < midValue) right = mid - 1;
    else left = mid + 1;
  }
  return -1;
};
var sortedNumbers = [2, 5, 7, 8, 11, 12, 50, 89, 99, 23, 90].sort(function (
  a,
  b
) {
  return a - b;
});
var foundIndexInSorted = binarySearchFn(sortedNumbers, 12);
console.log(foundIndexInSorted);
