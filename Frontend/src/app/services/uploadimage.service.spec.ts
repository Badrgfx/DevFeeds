import { TestBed, inject } from '@angular/core/testing';

import { UploadimageService } from './uploadimage.service';

describe('UploadimageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadimageService]
    });
  });

  it('should be created', inject([UploadimageService], (service: UploadimageService) => {
    expect(service).toBeTruthy();
  }));
});
