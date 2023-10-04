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
  public linearTime: number[] = [];
  public logarithmicTime: number[] = [];
  public quadraticOperations = [];
  public logLinearOperations  = [];

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
            label: "Linear Time",
            data: this.linearTime,
            backgroundColor: 'green'
          },
          {
            label: "Logarithmic Time",
            data: this.logarithmicTime,
            backgroundColor: 'limegreen'
          },
          // {
          //   label: "Log Linear Time",
          //   data: [2],
          //   backgroundColor: 'orange'
          // },
          // {
          //   label: "Quadratic Time",
          //   data: [3],
          //   backgroundColor: 'red'
          // }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Elements'
            }
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
        const linear = data[0];
        const logarithmic = data[1];
        console.log('promise completed', data)
        this.linearTime.push(linear.time);
        this.logarithmicTime.push(logarithmic.time);
        this.processes.push([linear, logarithmic]);
        this.chart.update()
      });



  }

  // Utilities
  // millisToMinutesAndSeconds(millis: number) {
  //   const date = new Date(millis);
  //   return `${date.getMinutes()}:${date.getSeconds()}`
  // }

  runAlgo(input: number): Promise<any> {
    return new Promise((resolve) => {
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.postMessage(input);
      worker.onmessage = ({ data }) => {
        resolve(data);
      };
    });
  }


}


