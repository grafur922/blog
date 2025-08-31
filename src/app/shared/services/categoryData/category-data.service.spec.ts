import { TestBed } from '@angular/core/testing';

import { CategoryDataService } from './category-data.service';

describe('ClassifyDataService', () => {
  let service: CategoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
