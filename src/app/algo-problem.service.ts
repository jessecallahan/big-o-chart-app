// generate by dollars algo (O 2973(n))
export function generateByDollarsForGovernmentId(sched1: any, localGovs: any) {
  let operations = 0;
  //sched1 = [{test: 'test'}];
    console.log(sched1.length, localGovs);
  sched1.map((schedule1Aggregation: any) => {
      const localGov = localGovs.find((gov: any) => {
        operations++;
        return gov.mcag === schedule1Aggregation.mcag
      });
  });
  console.log(operations);
}


