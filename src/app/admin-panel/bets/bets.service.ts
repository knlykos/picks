import { Injectable } from '@angular/core';
import { Bet } from 'src/app/models/bets';
import { Category } from 'src/app/models/category';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ContextMenu } from 'src/app/models/context-menu';

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
    return this.apollo.subscribe<Query>({
      query: gql`
        subscription {
          bets {
            categoryId
            createdAt
            createdBy
            description
            event
            eventUrl
            id
            placeId
            siteId
            title
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

  public getBetsById(id: number) {
    return this.apollo.watchQuery<{ bets: Bet[] }>({
      query: gql`{
        bets(where: {id: {_eq: ${id}}}) {
          categoryId
          createdAt
          createdBy
          description
          event
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

  public getCategories() {
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
    console.log(this.bet);
    this.category = category;
    this.apollo
      .mutate<Query>({
        mutation: gql`
        mutation {
          update_bets(
            where: { id: { _eq: ${this.bet.id} } }
            _set: {
              title: "${this.bet.title}"
              siteId: ${this.bet.siteId}
              placeId: ${this.bet.placeId}
              eventUrl: "${this.bet.eventUrl}"
              event: "${this.bet.event}"
              description: "${this.bet.description}"
              createdBy: ${this.bet.createdBy}
              createdAt: "${this.bet.createdAt}"
              categoryId: ${this.bet.categoryId}
            }
          ) {
            returning {
              id
              title
            }
          }
        }
      `
      })
      .subscribe(value => {
        console.log(value);
      });
  }
}
