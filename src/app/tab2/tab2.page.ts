import { Component, OnInit, ViewChild } from '@angular/core';
import { CovidApiService } from '../services/covid-api.service';
import { Countrys } from '../interfaces/covid.interface';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  paises: Countrys;
  pais: Countrys;


  customActionSheetOptions: any = {
    header: 'Paises con mayor numero de casos'
  };


  constructor(
    private covidApi: CovidApiService
  ) {}

  ngOnInit() {
    this.getPais('Colombia');
    this.getPaises();

  }

  ionViewWillEnter() {
    this.getPaises();
  }


  paisSeleccionado( event ) {
    this.getPais(event.detail.value);
  }

  getPaises() {
    this.covidApi.getAllContry().subscribe(resp => this.paises = resp);
  }

  getPais( pais ) {
    this.covidApi.getContry(pais).subscribe( resp => this.pais = resp);
  }





}
