/// <reference lib="webworker" />

import {processAlgos} from "./processAlgos.function";

addEventListener('message', ({ data }) => {
  const response = processAlgos(data);
  postMessage(response);
});
