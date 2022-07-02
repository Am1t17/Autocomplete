import {Component, OnInit} from '@angular/core';
import {AutoCompleteService} from "./service/auto-complete.service";

export interface City {
  id: number,
  cityName: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cityService: AutoCompleteService) {

  }

  cities: City[] = [];
  substring: string = "";

  sendData(event: any) {
    this.substring = event.target.value;
    this.cityService.getCities(this.substring).subscribe(
      (cities: any) => {
        this.cities = cities.result;
      }
    );
  }


}
