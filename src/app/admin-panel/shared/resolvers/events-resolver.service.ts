import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EventsService } from '../../events/events.service';
import { Observable } from 'rxjs';
import { BetQuery } from 'src/app/models/bets';
import { take, mergeMap } from 'rxjs/operators';

export interface BetsResolverReturn {
  data: { categories: { data: { bets: BetQuery[] } } };
}

@Injectable({
  providedIn: 'root'
})
export class EventsResolverService
  implements
    Resolve<
      Observable<{
        data: {
          events: Event[];
        };
      }>
    > {
  constructor(private eventsService: EventsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    data: {
      events: Event[];
    };
  }> {
    return this.eventsService.eventsListSubscription().pipe(take(1));
  }
}
