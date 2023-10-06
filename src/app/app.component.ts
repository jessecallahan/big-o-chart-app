import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {TestResults} from "./process-algos.function";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public logChart: any;
  public linChart: any;
  public input: any;
  public elements: number[] = [];


  // time complexity data
  public logarithmicTime: number[] = [];
  public linearTime: number[] = [];
  public logLinearTime: number[]  = [];
  public quadraticTime: number[] = [];

  // test results data
  public logarithmicTestResults: TestResults[] = [];
  public linearTestResults: TestResults[] = [];


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
  }

  // Process Input
  process(input: number) {
    // add to inputList
    this.elements.push(input);

    // clear input
    this.input = '';

    // process algos
    this.runAlgos(input);
  }

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
  }

  resolveWorker(data: any, type: string, chart: any, timeList: number[], testResultsList: TestResults[], input: number) {
    console.log('worker complete for:', type, input, data)
    timeList.push(data.time);
    testResultsList.push(data);
    chart.update();
  }

}


