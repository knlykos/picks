import { TestBed } from '@angular/core/testing';

import { BetsService } from './bets.service';

describe('BetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetsService = TestBed.get(BetsService);
    expect(service).toBeTruthy();
  });
});
