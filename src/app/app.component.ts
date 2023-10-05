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
    // add to inputList (todo turn into pure function)
    this.elements.push(input);

    // sort elements
    //this.elements.sort((a,b) => a - b);

    // clear input
    this.input = '';

    // console input list
    console.log(this.processes);

    // process algos
    this.runAlgo(input)
      // update chart
      .then((data) => {

        const logarithmic = data[0];
        const linear = data[1];
        const logLinear = data[2];
        const quadratic = data[3];

        console.log('promise complete for:', input, data)
        this.logarithmicTime.push(logarithmic.time);
        this.linearTime.push(linear.time);
        this.logLinearTime.push(logLinear.time);
        this.quadraticTime.push(quadratic.time);
        this.processes.push([logarithmic, linear, logLinear, quadratic]);
        this.chart.update();
      });
  }

  // autoProcess(input: number, stop = false) {
  //   const interval = setInterval(() => {
  //     this.process(input);
  //     input = input * 2;
  //     console.log('input', input);
  //   }, 5000);
  //
  //   if (stop) {
  //     clearInterval(interval)
  //   }
  // }

  // Utilities
  // millisToMinutesAndSeconds(millis: number) {
  //   const date = new Date(millis);
  //   return `${date.getMinutes()}:${date.getSeconds()}`
  // }

  runAlgo(input: number): Promise<any> {
    console.log('starting promise for input:', input)
    return new Promise((resolve) => {
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.postMessage(input);
      worker.onmessage = ({ data }) => {
        resolve(data);
      };
    });
  }


}


