import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {City} from "../models/City";


@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private http: HttpClient) {
  }

  getCities(substring: string, limit: number = 10): Observable<City[]> {
    return this.http.get<City[]>(`${environment.host}/api/Cities/Autocomplete`, {
      params: new HttpParams()
        .set('substring', substring)
        .set('limit', limit)
    });
  }
}
