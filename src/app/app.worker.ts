/// <reference lib="webworker" />

import {processAlgos} from "./process-algos.service";

addEventListener('message', ({ data }) => {
  const response = processAlgos(data);
  postMessage(response);
});
