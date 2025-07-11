import { TestBed } from '@angular/core/testing';

import { NavToViewService } from './nav-to-view.service';

describe('NavToViewService', () => {
  let service: NavToViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavToViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
