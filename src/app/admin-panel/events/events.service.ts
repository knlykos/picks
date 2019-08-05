import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/events';
import { Category } from 'src/app/models/category';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ContextMenu } from 'src/app/models/context-menu';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public event: Event;
  public events: Event[] = [];
  public category: Category;
  public contextMenu: ContextMenu[] = [];
  constructor(private apollo: Apollo, private router: Router, private spinner: NgxSpinnerService) {}

  public eventsListSubscription(): Observable<any> {
    console.log('eventsListSubscription');
    return this.apollo.subscribe<Query>({
      query: gql`
        subscription {
          events {
            id
            name
          }
        }
      `
    });
  }

  public insertEvents(event: Event, category: Category): Observable<any> {
    console.log(event);
    this.event = event;
    this.category = category;
    return this.apollo.mutate<Query>({
      mutation: gql`
        mutation {
          insert_events(
            objects: {
              name: "${this.event.name}"
            }
          ) {
            returning {
              id
            }
          }
        }
        `
    });
  }

  public getEventsById(id: number): Observable<ApolloQueryResult<{ events: Event[] }>> {
    return this.apollo.watchQuery<{ events: Event[] }>({
      query: gql`{
        events(where: {id: {_eq: ${id}}}) {
          name
        }
      }
      `
    }).valueChanges;
  }

  public getCategories(): Observable<
    ApolloQueryResult<{
      categories: Category[];
    }>
  > {
    return this.apollo.watchQuery<{ categories: Category[] }>({
      query: gql`
        {
          categories {
            id
            description
            name
          }
        }
      `
    }).valueChanges;
  }

  public updateEvent(event: Event) {
    this.event = event;

    return this.apollo.mutate<Query>({
      mutation: gql`
        mutation {
          update_events(
            where: { id: { _eq: ${this.event.id} } }
            _set: {
              name: "${this.event.name}"
            }
          ) {
            returning {
              id
              name
            }
          }
        }
      `
    });
  }

  ChangeNameId(teams: Event[], teamName: string) {
    let id = -1;
    teams.map(v => {
      if (v.name === teamName) {
        id = v.id;
      }
    });
    return id;
  }

  cancel(): void {
    this.router.navigateByUrl('/admin/events');
  }
}
