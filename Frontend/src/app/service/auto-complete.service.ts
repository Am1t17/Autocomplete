import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {debounceTime, Observable} from "rxjs";

export interface City {
  _id: number,
  cityName: string
}

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private http: HttpClient) {
  }

  getCities(substring: string, limit: number = 10): Observable<any> {
    return this.http.get<City[]>('https://localhost:7065/api/Cities/Autocomplete', {
      params: new HttpParams().set('substring', substring).set('limit', limit)
    })
  }
}
