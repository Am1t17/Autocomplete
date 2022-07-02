import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "./auto-complete.service";


@Injectable({
  providedIn: 'root'
})
export class GetCityByIdService {

  constructor(private http: HttpClient) {
  }

  getCityById(cityId: number): Observable<any> {
    const cityIdPath = `https://localhost:7065/api/Cities/${cityId}`;
    return this.http.get<City[]>(cityIdPath)
  }}
