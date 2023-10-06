import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public chart: any;
  public input: any;
  public elements: number[] = [];
  public processes: any[] = [];

  // time complexity data
  public logarithmicTime: number[] = [];
  public linearTime: number[] = [];
  public logLinearTime: number[]  = [];
  public quadraticTime: number[] = [];


  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  // Chart config
  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        // values on X-Axis
        labels: this.elements,
        datasets: [
          {
            label: "Logarithmic Time",
            data: this.logarithmicTime,
            backgroundColor: 'limegreen'
          },
          {
            label: "Linear Time",
            data: this.linearTime,
            backgroundColor: 'green'
          },
          {
            label: "Log Linear Time",
            data: this.logLinearTime,
            backgroundColor: 'orange'
          },
          {
            label: "Quadratic Time",
            data: this.quadraticTime,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
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

    });
  }

  // Process Input
  process(input: number) {
    // add to inputList
    this.elements.push(input);

    // clear input
    this.input = '';

    // console input list
    console.log(this.processes);

    // process algos
    this.runAlgo(input);
  }

  runAlgo(input: number): void {
    console.log('start web worker for:', input);
    const worker = new Worker(new URL('./app.worker', import.meta.url));
    worker.postMessage(input);
    worker.onmessage = ({ data }) => {
      // update chart
      this.resolveWorker(data, input);
    };
  }

  resolveWorker(data: any, input: number) {
    const logarithmic = data[0];
    const linear = data[1];
    const logLinear = data[2];
    const quadratic = data[3];

    console.log('worker complete for:', input, data)
    this.logarithmicTime.push(logarithmic.time);
    this.linearTime.push(linear.time);
    this.logLinearTime.push(logLinear.time);
    this.quadraticTime.push(quadratic.time);
    this.processes.push([logarithmic, linear, logLinear, quadratic]);

    this.chart.update();
  }

}


