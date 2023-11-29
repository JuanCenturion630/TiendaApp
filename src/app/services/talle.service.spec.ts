import { TestBed } from '@angular/core/testing';

import { TalleService } from './talle.service';

describe('TalleService', () => {
  let service: TalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
