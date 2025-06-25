import { TestBed } from '@angular/core/testing';

import { ClassifyDataService } from './classify-data.service';

describe('ClassifyDataService', () => {
  let service: ClassifyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassifyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
