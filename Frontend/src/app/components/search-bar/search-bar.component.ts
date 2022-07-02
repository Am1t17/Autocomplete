import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, Observable, retry, Subject, switchMap} from "rxjs";
import {City} from "../../app.component";
import {AutoCompleteService} from "../../service/auto-complete.service";
import {GetCityByIdService} from "../../service/get-city-by-id.service";

const LIMIT_AUTO_COMPLETE = 10;


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  autoCompleteSubstringForm: FormControl = new FormControl('')
  observableResult?: Observable<City[]>
  results2: City[] = [];
  substring: string = "";
  result: string = ""
  selectedCityId = new Subject<City>()
  selectedCity?:Observable<City>;
  constructor(private cityService: AutoCompleteService, private getCityByIdService: GetCityByIdService) {
  }

  ngOnInit(): void {

    this.selectedCity = this.selectedCityId.pipe(
      distinctUntilChanged(),
      switchMap((city: City)=> this.getCityByIdService.getCityById(city.id)
        .pipe(
          retry(3)
        ))
    )

    this.autoCompleteSubstringForm.valueChanges.pipe(
      map((substring) => substring.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== ''),
      switchMap((substring: string) => {
        if (this.substring.length >= substring.length) {
          this.results2 = [];
        }
        this.results2 = this.results2.filter((city) => city.cityName.toLowerCase().startsWith(substring.toLowerCase()))
        this.substring = substring;

        return this.cityService.getCities(substring, LIMIT_AUTO_COMPLETE).pipe(
          retry(3)
        )
      })
    ).subscribe(
      x => {
        if (this.results2.length === 0) {
          this.results2 = x;
        } else {
          x.forEach((cityResponse: City) => {
            if (this.results2.find(city => city.cityName !== cityResponse.cityName)) {
              this.results2.push(cityResponse);
            }
          })
        }
      }
    );

    this.observableResult = this.autoCompleteSubstringForm.valueChanges.pipe(
      map((substring) => substring.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== ''),
      switchMap((substring: string) => {
        return this.cityService.getCities(substring).pipe(
          retry(3)
        )
      })
    );
  }

  onClickCity(city: City) {
    this.selectedCityId.next(city);
  }

}
