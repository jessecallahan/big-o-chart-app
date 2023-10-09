import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {TestResults} from "./process-algos.service";
import {generateByDollarsForGovernmentId} from "./algo-problem.service";
import {localGovs, sched1TestData} from "./test-data";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public input: any;
  public elements: number[] = [];

  // charts
  public logChart: any;
  public linChart: any;
  public logLinChart: any;
  public quadraticChart: any;
  public dollarsPreBinaryChart: any;
  public dollarsBinaryChart: any;

  // time complexity data
  public logarithmicTime: number[] = [];
  public linearTime: number[] = [];
  public logLinearTime: number[]  = [];
  public quadraticTime: number[] = [];

  // test results data
  public logarithmicTestResults: TestResults[] = [];
  public linearTestResults: TestResults[] = [];
  public logLinearTestResults: TestResults[] = [];
  public quadraticTestResults: TestResults[] = [];

  chartOptions: any = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time (ms)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Elements'
        }
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },

          mode: 'xy',
        },
        pan: {
          enabled: true
        },
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.createCharts();
    generateByDollarsForGovernmentId(sched1TestData, localGovs)
  }

  // Chart config
  createCharts(){
    this.logChart = new Chart("logChart", {
      type: 'line',
      data: {
        // values on X-Axis
        labels: this.elements,
        datasets: [
          {
            label: "Logarithmic Time",
            data: this.logarithmicTime,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: this.chartOptions
    });

    this.linChart = new Chart("linChart", {
      type: 'line',
      data: {
        // values on X-Axis
        labels: this.elements,
        datasets: [
          {
            label: "Linear Time",
            data: this.linearTime,
            backgroundColor: 'green'
          }
        ]
      },
      options: this.chartOptions
    });

    this.logLinChart = new Chart("logLinChart", {
      type: 'line',
      data: {
        // values on X-Axis
        labels: this.elements,
        datasets: [
          {
            label: "Log Linear Time",
            data: this.logLinearTime,
            backgroundColor: 'orange'
          }
        ]
      },
      options: this.chartOptions
    });

    this.quadraticChart = new Chart("quadraticChart", {
      type: 'line',
      data: {
        // values on X-Axis
        labels: this.elements,
        datasets: [
          {
            label: "Quadratic Time",
            data: this.quadraticTime,
            backgroundColor: 'red'
          }
        ]
      },
      options: this.chartOptions
    });

    this.dollarsPreBinaryChart = new Chart("dollarsPreBinaryChart", {
        type: 'line',
        data: {
            // values on X-Axis
            labels: this.elements,
            datasets: [
                {
                    label: "Dollars Pre Binary Time",
                    data: [44],
                    backgroundColor: 'red'
                }
            ]
        },
        options: this.chartOptions
    });

    this.dollarsBinaryChart = new Chart("dollarsBinaryChart", {
        type: 'line',
        data: {
            // values on X-Axis
            labels: this.elements,
            datasets: [
                {
                    label: "Dollars Binary Time",
                    data: [44],
                    backgroundColor: 'red'
                }
            ]
        },
        options: this.chartOptions
    });
  }

  // Process Input
  process(input: number) {
    // add to inputList
    this.elements.push(input);

    // prepareSched1TestData
      console.log('y', this.prepareSched1TestData(input));

    // clear input
    this.input = '';

    // process algos
    this.runAlgos(input);
  }

  // Process algos
  runAlgos(input: number): void {
    console.log('start web worker for:', input);
    // run four web workers
    // run Logarithmic
    const logWorker = new Worker(new URL('./app.worker', import.meta.url));
    logWorker.postMessage({input: input, type: 'Logarithmic'});
    logWorker.onmessage = ({ data }) => {
      // update chart
      this.resolveWorker(data, 'Logarithmic', this.logChart, this.logarithmicTime, this.logarithmicTestResults, input);
    };

    // run Linear
    const linWorker = new Worker(new URL('./app.worker', import.meta.url));
    linWorker.postMessage({input: input, type: 'Linear'});
    linWorker.onmessage = ({ data }) => {
      // update chart
      this.resolveWorker(data, 'Linear', this.linChart, this.linearTime, this.linearTestResults, input);
    };

    // run Log Linear
    const logLinearWorker = new Worker(new URL('./app.worker', import.meta.url));
    logLinearWorker.postMessage({input: input, type: 'Log Linear'});
    logLinearWorker.onmessage = ({ data }) => {
      // update chart
      this.resolveWorker(data, 'Log Linear', this.logLinChart, this.logLinearTime, this.logLinearTestResults, input);
    };

    // run Quadratic
    const quadraticWorker = new Worker(new URL('./app.worker', import.meta.url));
    quadraticWorker.postMessage({input: input, type: 'Quadratic'});
    quadraticWorker.onmessage = ({ data }) => {
      // update chart
      this.resolveWorker(data, 'Quadratic', this.quadraticChart, this.quadraticTime, this.quadraticTestResults, input);
    };
  }

  // Update data
  resolveWorker(data: any, type: string, chart: any, timeList: number[], testResultsList: TestResults[], input: number) {
    console.log('worker complete for:', type, input, data)
    // push time data
    timeList.push(data.time);

    // push test result data
    testResultsList.push(data);

    // update chart
    chart.update();
  }

  // todo comment
  prepareSched1TestData(input: number) {
      if(input <= 1688) {
        return sched1TestData.slice(0, input);
      } else {
        const amountOfObjectsToCreate = input - 1688;
        let additionalArray: any[] = [];
          for(let i = 0; i < amountOfObjectsToCreate; i++) {
            additionalArray.push({
              "mcag": "00",
              "year": 2021,
              "fsSectionId": 20,
              "totalAmount": 1000,

            })
          }
        return [...additionalArray, ...sched1TestData ];
      }
  }

}


