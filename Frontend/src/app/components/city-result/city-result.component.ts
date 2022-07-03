import {Component, Input, OnInit} from '@angular/core';
import {City} from "../../app.component";
import {Observable} from "rxjs";

type ObserverCity = City | undefined | Error


@Component({
  selector: 'city-result',
  templateUrl: './city-result.component.html',
  styleUrls: ['./city-result.component.css']
})


export class CityResultComponent implements OnInit {
  @Input()
  public city$!:Observable<ObserverCity>
  constructor() {
  }

  ngOnInit(): void {
  }
  isCity(object: ObserverCity): object is City{
    return !!(object && "cityName" in object);
  }
}
