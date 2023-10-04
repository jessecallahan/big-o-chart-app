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

  // time complexity data
  public linearTime: number[] = [];
  public quadraticOperations = [];
  public logarithmicOperations = [];
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
            backgroundColor: 'limegreen'
          },
          {
            label: "Logarithmic Time",
            data: [1],
            backgroundColor: 'limegreen'
          },
          {
            label: "Log Linear Time",
            data: [2],
            backgroundColor: 'orange'
          },
          {
            label: "Quadratic Time",
            data: [3],
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
  processInput(input: number) {
    // add to inputList (todo turn into pure function)
    this.elements.push(input);

    // sort elements
    this.elements.sort((a,b) => a - b);

    // clear input
    this.input = '';

    // console input list
    console.log(this.elements);

    // process algos
    var t0 = performance.now();
    this.linear(input);
    var t1 = performance.now();
    this.linearTime.push(t1 - t0);

    // update chart
    this.chart.update();
  }

  // Algorithms
  // Linear Time
  linear = (n: number) => {
    for(let i = 0; i <= n; i++) {
      console.log(n);
    }
  }
}
