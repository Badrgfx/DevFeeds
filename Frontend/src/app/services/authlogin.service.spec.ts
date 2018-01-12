import { TestBed, inject } from '@angular/core/testing';

import { AuthloginService } from './authlogin.service';

describe('AuthloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthloginService]
    });
  });

  it('should be created', inject([AuthloginService], (service: AuthloginService) => {
    expect(service).toBeTruthy();
  }));
});
