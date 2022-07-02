import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {City} from "../models/City";


@Injectable({
  providedIn: 'root'
})
export class GetCityByIdService {

  constructor(private http: HttpClient) {
  }

  getCityById(cityId: number): Observable<City> {
    const cityIdPath = `${environment.host}/api/Cities/${cityId}`;
    return this.http.get<City>(cityIdPath)
  }
}
