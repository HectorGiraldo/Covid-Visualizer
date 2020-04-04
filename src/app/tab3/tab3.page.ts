import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CovidApiService } from '../services/covid-api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild( 'linesChart', {static: true} ) linesChart;
  @ViewChild( 'radarChart', {static: true} ) radarChart;

  cases = [];
  recovered = [];
  dateCases = [];
  deaths = [];
  casesPie;
  deathsPie;
  recoveredPie;
  country;

  lines: any;
  radar: any;
  colorArray: any;

  constructor(
    private covidApi: CovidApiService
  ) {}

  ngOnInit() {
    // this.covidApi.getContry('Colombia');
    // this.covidApi.gethistoryCountry('Colombia');
  }

  getHistory( ) {
      this.covidApi.callGetHistory().subscribe(resp => {
      this.cases = Object.values(resp.timeline.cases);
      this.recovered = Object.values(resp.timeline.recovered);
      this.dateCases = Object.keys(resp.timeline.cases);
      this.deaths = Object.values(resp.timeline.deaths);
      this.country = resp.country;
      this.createLineChart();
    });

  }

  getCountry() {

      this.covidApi.callGetCountry().subscribe(resp => {
      this.casesPie = resp.cases;
      this.deathsPie = resp.deaths;
      this.recoveredPie = resp.recovered;
      this.createPieChart();
    });
  }


  ionViewDidEnter() {
    this.getHistory();
    this.getCountry();
  }

  createLineChart() {
    this.lines = new Chart(this.linesChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.dateCases,
        datasets: [{
          label: 'Casos',
          data: this.cases,
          backgroundColor: 'rgb(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: '#ffa600', // array should have same number of elements as number of dataset
          borderWidth: 2
        }, {
          label: 'Muertes',
          data: this.deaths,
          backgroundColor: 'rgb(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: '#ff6361', // array should have same number of elements as number of dataset
          borderWidth: 2
        }, {
          label: 'Recuperados',
          data: this.recovered,
          backgroundColor: 'rgb(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: '#58508d', // array should have same number of elements as number of dataset
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }


  createPieChart() {

    this.radar = new Chart(this.radarChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Casos', 'Muertes', 'Recuperados'],
        datasets: [{
          label: 'Casos Confirmados',
          data: [this.casesPie, this.deathsPie, this.recoveredPie],
          backgroundColor: ['#ffa600', '#ff6361', '#58508d'], // array should have same number of elements as number of dataset
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

}
