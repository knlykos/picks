import { Injectable } from '@angular/core';
import { Bet } from 'src/app/models/bets';
import { Category } from 'src/app/models/category';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ContextMenu } from 'src/app/models/context-menu';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  public bet: Bet;
  public bets: Bet[] = [];
  public category: Category;
  public contextMenu: ContextMenu[] = [];
  constructor(private apollo: Apollo) {}

  public betsListSubscription(): Observable<{ data: { bets: Bet[] } }> {
    console.log('betsListSubscription');
    return this.apollo.subscribe<Query>({
      query: gql`
        subscription {
          bets(order_by: { id: desc }) {
            categoryId
            createdAt
            createdBy
            description
            eventUrl
            id
            placeId
            siteId
            title
            eventDate
          }
        }
      `
    });
  }

  public insertBets(bet: Bet, category: Category) {
    this.bet = bet;
    this.category = category;
    this.apollo
      .mutate<Query>({
        mutation: gql`
        mutation {
          insert_bets(
            objects: {
              categoryId: ${this.category.id}
              description: "${this.bet.description}"
              eventUrl: "${this.bet.eventUrl}"
              title: "${this.bet.title}"
              createdAt: "${new Date().toJSON()}",
              eventDate: "${new Date(this.bet.eventDate).toJSON()}",
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

  public getBetsById(id: number): Observable<ApolloQueryResult<{ bets: Bet[] }>> {
    return this.apollo.watchQuery<{ bets: Bet[] }>({
      query: gql`{
        bets(where: {id: {_eq: ${id}}}) {
          categoryId
          createdAt
          createdBy
          description
          eventDate
          eventUrl
          id
          placeId
          siteId
          title
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

  public updateBet(bet: Bet, category: Category) {
    this.bet = bet;
    this.category = category;
    return this.apollo.mutate<Query>({
      mutation: gql`
        mutation {
          update_bets(
            where: { id: { _eq: ${this.bet.id} } }
            _set: {
              title: "${this.bet.title}"
              siteId: ${this.bet.siteId}
              placeId: ${this.bet.placeId}
              eventUrl: "${this.bet.eventUrl}"
              description: "${this.bet.description}"
              createdBy: ${this.bet.createdBy}
              createdAt: "${new Date().toJSON()}"
              categoryId: ${this.bet.categoryId}
              eventDate: "${new Date(this.bet.eventDate).toJSON()}"
            }
          ) {
            returning {
              id
              title
            }
          }
        }
      `
    });
  }
}
