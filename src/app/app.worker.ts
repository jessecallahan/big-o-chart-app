/// <reference lib="webworker" />

import {processAlgos} from "./process-algos.function";

addEventListener('message', ({ data }) => {
  const response = processAlgos(data);
  postMessage(response);
});
