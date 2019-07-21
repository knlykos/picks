import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BetsService } from './../../bets/bets.service';
import { Observable } from 'rxjs';
import { Bet } from 'src/app/models/bets';
import { take, mergeMap } from 'rxjs/operators';

export interface BetsResolverReturn {
  data: { categories: { data: { bets: Bet[] } } };
}

@Injectable({
  providedIn: 'root'
})
export class BetsResolverService implements Resolve<Observable<{ data: { bets: Bet[] } }>> {
  constructor(private betsService: BetsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    data: {
      bets: Bet[];
    };
  }> {
    return this.betsService.betsListSubscription().pipe(take(1));
  }
}
