const arr = [
  [1, 2, 3],
  [4, 5],
  [1, 2, 3],
  [6, 7, 8],
  [4, 5],
  [9, 10],
  [6, 7, 8],
  [1, 2, 3],
];

function returnUniqueArrays(arr) {
  const stringifiedArr = arr.map((subArr) => JSON.stringify(subArr));
  console.log(stringifiedArr);

  const myset = new Set();

  for (const str of stringifiedArr) {
    myset.add(str);
  }

  console.log(myset);
}

returnUniqueArrays(arr);
