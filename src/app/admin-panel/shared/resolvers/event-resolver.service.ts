import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EventsService } from '../../events/events.service';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/events';
import { take, mergeMap } from 'rxjs/operators';

export interface EventResolverReturn {
  events: { data: { events: Event[] } };
}

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<ApolloQueryResult<{ events: Event[] }>> {
  constructor(private eventsService: EventsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<{ events: Event[] }>> {
    const id: number = route.params.id;
    return this.eventsService.getEventsById(id).pipe(take(1));
  }
}
