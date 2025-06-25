import { TestBed } from '@angular/core/testing';

import { NavHrefService } from './nav-href.service';

describe('NavHrefService', () => {
  let service: NavHrefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavHrefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
