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
  public linearOperations = [];
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
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Logarithmic Time",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Log Linear Time",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'orange'
          },
          {
            label: "Quadratic Time",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
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
              text: 'Operations'
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

    // update chart
    this.chart.update();
  }

  // Algorithms

}
