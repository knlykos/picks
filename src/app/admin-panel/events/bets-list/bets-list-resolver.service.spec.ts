import { TestBed } from '@angular/core/testing';

import { BetsListResolverService } from './bets-list-resolver.service';

describe('BetsListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetsListResolverService = TestBed.get(BetsListResolverService);
    expect(service).toBeTruthy();
  });
});
