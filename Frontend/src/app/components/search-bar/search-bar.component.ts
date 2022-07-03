import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable, of,
  retry,
  startWith,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {City} from "../../app.component";
import {AutoCompleteService} from "../../services/auto-complete.service";
import {GetCityByIdService} from "../../services/get-city-by-id.service";

const LIMIT_AUTO_COMPLETE = 10;

export type citiesResults = City[] | Error;

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  autoCompleteSubstringForm: FormControl = new FormControl('')
  observableResult!: Observable<citiesResults>
  previousCitiesResults: City[] = [];

  selectedCityId$ = new Subject<City>()
  selectedCity$!: Observable<City | undefined | Error>;
  selectedCity?: City;
  constructor(private cityService: AutoCompleteService, private getCityByIdService: GetCityByIdService) {
  }

  ngOnInit(): void {

    this.selectedCity$ = this.selectedCityId$.pipe(
      distinctUntilChanged(),
      tap(res => this.selectedCity = res),
      switchMap((city: City) => this.getCityByIdService.getCityById(city.id)
        .pipe(
          startWith(this.selectedCity), // optimistic approach - assuming the server returns the city correctly
          retry(3),
          catchError((err) => {
            if (err.status === 404) {
              return of(Error("City not found"))
            }
            return of(Error("An unexpected error occurred"))
          }),
        )
      )
    )

    this.observableResult = this.autoCompleteSubstringForm.valueChanges.pipe(
      map((substring) => substring.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== ''),
      switchMap((substring: string) => {
        return this.cityService.getCities(substring, LIMIT_AUTO_COMPLETE).pipe(
          tap(res => this.previousCitiesResults = res),
          retry(3),
          startWith(this.previousCitiesResults.filter((city: City) => city.cityName.toLowerCase().startsWith(substring.toLowerCase()))),
          catchError((err) => {
            if (err.status === 400) {
              return of(Error("Error: BadInput"))
            }
            return of(Error("An unexpected error occurred"))
          }),
        )
      })
    );
  }

  onClickCity(city: City) {
    this.selectedCityId$.next(city);
  }

  isCityResults(object: citiesResults): object is City[] {
    return !!Array.isArray(object);
  }
}
