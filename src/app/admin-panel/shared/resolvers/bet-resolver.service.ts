import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BetsService } from './../../bets/bets.service';
import { Observable } from 'rxjs';
import { Bet } from 'src/app/models/bets';
import { take, mergeMap } from 'rxjs/operators';

export interface BetResolverReturn {
  bets: { data: { bets: Bet } };
}

@Injectable({
  providedIn: 'root'
})
export class BetResolverService implements Resolve<ApolloQueryResult<{ bets: Bet[] }>> {
  constructor(private betsService: BetsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<{ bets: Bet[] }>> {
    const id: number = route.params.id;
    return this.betsService.getBetsById(id).pipe(take(1));
  }
}
