import { Injectable } from '@angular/core';
import { Event } from 'src/app/models/events';
import { Category } from 'src/app/models/category';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ContextMenu } from 'src/app/models/context-menu';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public event: Event;
  public events: Event[] = [];
  public category: Category;
  public contextMenu: ContextMenu[] = [];
  constructor(private apollo: Apollo, private router: Router) {}

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

  public insertEvents(event: Event, category: Category) {
    this.event = event;
    this.category = category;
    this.apollo
      .mutate<Query>({
        mutation: gql`
        mutation {
          insert_events(
            objects: {
              name: ${this.event.name}
            }
          ) {
            returning {
              id
            }
          }
        }
        `
      })
      .subscribe(value => {
        return value;
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
    console.log(this.event);
    this.apollo
      .mutate<Query>({
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
      })
      .subscribe(value => {
        console.log(value);
      });
  }

  cancel(): void {
    this.router.navigateByUrl('/admin/events');
  }
}
