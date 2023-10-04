
export function processAlgos(input: number) {
  //
  const lin0 = performance.now();
  const linOp = linear(input);
  const lin1 = performance.now();

  //
  const log0 = performance.now();
  const logOp = logarithmic(input);
  const log1 = performance.now();

  const linearObject = {
    time: lin1 - lin0,
    type: 'Linear',
    operations: linOp,
    input: input
  }

  const logarithmicObject = {
    time: log1 - log0,
    type: 'Logarithmic',
    operations: logOp,
    input: input
  }


  return [linearObject, logarithmicObject];
}

// Algorithms
// Linear Time
function linear(n: number, operations = 0) {
  for(let i = 0; i < n; i++) {
    operations++;
    //console.log('linear input', n);
  }
  return operations;
}

// Logarithmic Time
function logarithmic(n: number, operations = 0) {
  if (n === 0) {
    return operations - 1;
  }
  operations++;
  n = Math.floor(n / 2);
  //console.log('logarithmic input', n, operations);
  return logarithmic(n, operations);
}

// Log Linear Time
// Quadratic Time
