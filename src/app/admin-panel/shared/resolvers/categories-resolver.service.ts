import { Injectable } from '@angular/core';
import { BetQuery } from 'src/app/models/bets';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BetsService } from './../../bets/bets.service';
import { Observable, pipe } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { Category } from 'src/app/models/category';
import { take } from 'rxjs/operators';

export interface CategoriesResolverReturn {
  data: { categories: { data: { categories: Category[] } } };
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverService
  implements Resolve<ApolloQueryResult<{ categories: Category[] }>> {
  constructor(private betsService: BetsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<{ categories: Category[] }>> {
    return this.betsService.getCategories().pipe(take(1));
  }
}
