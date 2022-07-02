import { TestBed } from '@angular/core/testing';

import { GetCityByIdService } from './get-city-by-id.service';

describe('GetCityByIdService', () => {
  let service: GetCityByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCityByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
