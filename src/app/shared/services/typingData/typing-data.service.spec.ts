import { TestBed } from '@angular/core/testing';

import { TypingDataService } from './typing-data.service';

describe('TypingDataService', () => {
  let service: TypingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
