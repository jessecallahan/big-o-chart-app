/// <reference lib="webworker" />

import {processAlgos} from "./process-algos.service";
import {processProblem} from "./algo-problem.service";

addEventListener('message', ({ data }) => {
  if(data.type === 'Problem') {
    const response = processProblem(data);
    postMessage(response);
  } else {
    const response = processAlgos(data);
    postMessage(response);
  }

});

