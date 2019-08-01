import { Injectable } from '@angular/core';
import { Bet } from 'src/app/models/bets';
import { Category } from 'src/app/models/category';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ContextMenu } from 'src/app/models/context-menu';
import { ApolloQueryResult } from 'apollo-client';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
// Los servicios son clases que sirven para interconectar los componentes
// y reulizar funciones entre los componentes.
export class BetsService {
  public bet: Bet;
  public bets: Bet[] = [];
  public category: Category;
  public contextMenu: ContextMenu[] = [];
  constructor(private apollo: Apollo, private appService: AppService) {}

  // por ejemplos todos las funciones que hay aqui solo reciben parametros y retornan un observable
  // el observable es una llamada al servidor que obtiene los datos un query
  // en este caso obtiene la lista de las apuestas
  public betsListSubscription(): Observable<{ data: { bets: Bet[] } }> {
    this.appService.show();
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
    this.appService.show();
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
              teamOneId: ${this.bet.teamOneId},
              teamTwoId: ${this.bet.teamTwoId}
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
    this.appService.show();
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
          title,
          teamOneId,
          teamTwoId
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
    this.appService.show();
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
    this.appService.show();
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
              eventDate: "${new Date(this.bet.eventDate).toJSON()}",
              teamOneId: ${this.bet.teamOneId},
              teamTwoId: ${this.bet.teamTwoId}
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
