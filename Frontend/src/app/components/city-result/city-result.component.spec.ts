import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityResultComponent } from './city-result.component';

describe('CityResultComponent', () => {
  let component: CityResultComponent;
  let fixture: ComponentFixture<CityResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
