
export function processAlgos(input: number) {
  return [
    prepareTestResults('Logarithmic', logo, input),
    prepareTestResults('Linear', linear, input),
    prepareTestResults('Log Linear', logLinear, input),
    prepareTestResults('Quadratic', quadratic, input)
  ];
}

function prepareTestResults(type: string, operations: Function, input: number) {
  const t0 = performance.now();
  const op = operations(input);
  const t1 =  performance.now();;

  console.log(type, 't1:', t1, 't0:', t0)
  return {
    time: t1 - t0,
    type: type,
    operations: op,
    input: input
  }
}

// Algorithms
// Logarithmic Time - O(log n)
const logo = function logarithmic(n: number, operations = 0) {
  while(n > 1) {
    n = Math.floor(n / 2);
    operations++;
  }
  return operations;
}

// Linear Time - O(n)
const linear = function linear(n: number, operations = 0) {
  for(let i = 0; i < n; i++) {
    operations++;
  }
  return operations;
}

// Log Linear Time - O(n log n)
const logLinear = function logLinear(n: number, operations = 0) {
  let y = n;
  while(n > 1) {
    n = Math.floor(n / 2)
    for (let i = 1; i<= y; i++) {
      operations++;
    }
  }
  return operations;

}

// Quadratic Time - O(n^2)
const quadratic = function quadratic(n: number, operations = 0) {
  for(let i= 0; i< n; i++) {
    for(let j = 0; j < n; j++) {
      operations++
    }
  }
  return operations;
}
