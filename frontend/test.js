// Bad code
function badLoop(arr) {
  for (let i = 0; i < arr.length; i++) {
    // loop body
  }
}

// Better code
function betterLoop(arr) {
  let l = arr.length;
  for (let i = 0; i < l; i++) {
    // loop body
  }
}

// Create a large array for testing
const largeArray = new Array(1000000).fill(0);

// Measure the time taken by badLoop
console.time('Bad Loop');
badLoop(largeArray);
console.timeEnd('Bad Loop');

// Measure the time taken by betterLoop
console.time('Better Loop');
betterLoop(largeArray);
console.timeEnd('Better Loop');
