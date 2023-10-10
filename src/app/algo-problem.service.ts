import {TestResults} from "./process-algos.service";
import {localGovs} from "./test-data";

export function processProblem(input: any) {

  if (input.subType === 'Pre Binary') {
    const t0 = performance.now();
    const op = generateByDollarsForGovernmentId(input.input);
    const t1 =  performance.now();

    console.log(input.subType, 't1:', t1, 't0:', t0);
    return new TestResults(t1 - t0, input.type, op, input.input.length);
  } else {
    const t0 = performance.now();
    const op = generateByDollarsForGovernmentIdBinary(input.input);
    const t1 =  performance.now();

    console.log(input.subType, 't1:', t1, 't0:', t0);
    return new TestResults(t1 - t0, input.type, op, input.input.length);
  }
}

// generate by dollars algo (O 2973(n))
function generateByDollarsForGovernmentId(sched1: any) {
  let operations = 0;
  sched1.map((schedule1Aggregation: any) => {
      const localGov = localGovs.find((gov: any) => {
        operations++;
        return gov.mcag === schedule1Aggregation.mcag
      });
    //console.log('found local gov pre-binary:', localGov)
  });
  return operations;
}

// generate by dollars algo - with binary search
function generateByDollarsForGovernmentIdBinary(sched1: any) {
  let operations = 0;
  sched1.map((schedule1Aggregation: any) => {
    const localGov = binarySearch(localGovs, schedule1Aggregation.mcag, operations);
    operations = localGov.operations;
    //console.log('found local gov binary:', localGovs[localGov.foundIndex])
  });
  return operations;
}

// Program to implement iterative Binary Search
// https://www.geeksforgeeks.org/binary-search/
// A iterative binary search function. It returns
// location of x in given array arr[l/r] is present,
// otherwise -1
function binarySearch(arr: any, x: string, operations = 0)
{
  let l = 0;
  let r = arr.length - 1;
  let mid;
  while (r >= l) {
    operations++;
    mid = l + Math.floor((r - l) / 2);

    // If the element is present at the middle
    // itself
    if (arr[mid].mcag == x)
      return {foundIndex: mid, operations: operations};

    // If element is smaller than mid, then
    // it can only be present in left subarray
    if (arr[mid].mcag > x)
      r = mid - 1;

      // Else the element can only be present
    // in right subarray
    else
      l = mid + 1;
  }

  // We reach here when element is not
  // present in array
  return {foundIndex: -1, operations: operations};
}

