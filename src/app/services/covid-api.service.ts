import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Total, Countrys, HistoryCountry } from '../interfaces/covid.interface';

const apiUrl = environment.apiUrl;
const apiUrlV2 = environment.apiUrlV2;

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  pais;

  constructor(
    private http: HttpClient
  ) { }


  getAll() {
    const url = apiUrl + '/all';

    return this.http.get<Total>( url );
  }

  getAllContry() {
    const url = apiUrl + '/countries';

    return this.http.get<Countrys>( url );
  }

  getContry( id ) {
    this.pais = id;
    const url = apiUrl + '/countries';

    return this.http.get<Countrys>( `${url}/${id}` );
  }

  gethistoryCountry( id ) {
    const url = apiUrlV2 + '/historical';

    return this.http.get<HistoryCountry>( `${url}/${id}` );
  }

  callGetHistory() {
    return this.gethistoryCountry( this.pais);
  }

  callGetCountry() {
    return this.getContry(this.pais);
  }
}
