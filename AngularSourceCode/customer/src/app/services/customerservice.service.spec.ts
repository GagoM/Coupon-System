import { TestBed, inject } from '@angular/core/testing';

import { CustomerserviceService } from './customerservice.service';

describe('CustomerserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerserviceService]
    });
  });

  it('should be created', inject([CustomerserviceService], (service: CustomerserviceService) => {
    expect(service).toBeTruthy();
  }));
});
