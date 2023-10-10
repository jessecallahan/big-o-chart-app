import {TestResults} from "./process-algos.service";
import {localGovs} from "./test-data";

export function processProblem(input: any) {

  const t0 = performance.now();
  const op = generateByDollarsForGovernmentId(input.input);
  const t1 =  performance.now();

  console.log(input.type, 't1:', t1, 't0:', t0);
  return new TestResults(t1 - t0, input.type, op, input.input.length);
}


// generate by dollars algo (O 2973(n))
function generateByDollarsForGovernmentId(sched1: any) {
  let operations = 0;

  sched1.map((schedule1Aggregation: any) => {
      const localGov = localGovs.find((gov: any) => {
        operations++;
        return gov.mcag === schedule1Aggregation.mcag
      });
  });
  return operations;
}


