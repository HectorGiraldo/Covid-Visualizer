import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../services/covid-api.service';
import { Total } from '../interfaces/covid.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  totales: Total;

  constructor(
    private covidApi: CovidApiService
  ) {}

  ngOnInit() {
    // this.getAll();
  }

  ionViewWillEnter() {
    this.getAll();
  }


  getAll() {
    this.covidApi.getAll().subscribe(resp => this.totales = resp);
  }

}
