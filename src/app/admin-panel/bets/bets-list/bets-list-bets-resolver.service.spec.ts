import { TestBed } from '@angular/core/testing';

import { BetsListBetsResolverService } from './bets-list-bets-resolver.service';

describe('BetsListBetsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetsListBetsResolverService = TestBed.get(BetsListBetsResolverService);
    expect(service).toBeTruthy();
  });
});
