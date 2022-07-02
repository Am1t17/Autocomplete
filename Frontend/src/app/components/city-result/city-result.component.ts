import {Component, Input, OnInit} from '@angular/core';
import {City} from "../../app.component";
import {Observable} from "rxjs";

@Component({
  selector: 'city-result',
  templateUrl: './city-result.component.html',
  styleUrls: ['./city-result.component.css']
})
export class CityResultComponent implements OnInit {
  @Input()
  public city$!:Observable<City | undefined>
  constructor() {
  }

  ngOnInit(): void {
  }
}
