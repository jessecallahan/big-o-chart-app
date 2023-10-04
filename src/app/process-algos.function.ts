
export function processAlgos(input: number) {
  //
  const lin0 = performance.now();
  const linOp = linear(input);
  const lin1 = performance.now();

  //
  const log0 = performance.now();
  const logOp = logarithmic(input);
  const log1 = performance.now();

  //
  const logLin0 = performance.now();
  const logLinOp = logLinear(input);
  const logLin1 = performance.now();

  //
  const quad0 = performance.now();
  const quadOp = quadratic(input);
  const quad1 = performance.now();

  const logarithmicObject = {
    time: log1 - log0,
    type: 'Logarithmic',
    operations: logOp,
    input: input
  }

  const linearObject = {
    time: lin1 - lin0,
    type: 'Linear',
    operations: linOp,
    input: input
  }

  const logLinearObject = {
    time: logLin1 - logLin0,
    type: 'Log Linear Time',
    operations: logLinOp,
    input: input
  }

  const quadraticObject = {
    time: quad1 - quad0,
    type: 'Quadratic Time',
    operations: quadOp,
    input: input
  }


  return [logarithmicObject, linearObject, logLinearObject, quadraticObject];
}

// Algorithms
// Logarithmic Time
function logarithmic(n: number, operations = 0) {
  while(n > 1) {
    n = Math.floor(n / 2);
    operations++;
  }
  return operations;
}

// Linear Time
function linear(n: number, operations = 0) {
  for(let i = 0; i < n; i++) {
    operations++;
    //console.log('linear input', n);
  }
  return operations;
}

// Log Linear Time
function logLinear(n: number, operations = 0) {
  let y = n;
  while(n > 1) {
    n = Math.floor(n / 2)
    for (let i = 1; i<= y; i++) {
      operations++;
    }
  }
  return operations;

}

// Quadratic Time
function quadratic(n: number, operations = 0) {
  for(let i=0; i< n; i++) {
    for(let j = 0; j < n; j++) {
      operations++
    }
  }
  return operations;
}
