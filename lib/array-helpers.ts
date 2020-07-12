export function randomizedIndices(length: number): Array<number> {
  const indices = new Array(length).fill(0).map((_, i) => i);
  fisherYatesShuffle(indices);
  return indices;
}

/**
 * In-place array shuffle
 * See https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 */
function fisherYatesShuffle(arr: Array<any>): void {
  /*
  -- To shuffle an array a of n elements (indices 0..n-1):
for i from n−1 downto 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]
     */

  for (let i = arr.length - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(arr, i, j);
  }
}

function swap(arr: Array<any>, i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
