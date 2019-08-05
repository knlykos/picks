import { Injectable } from '@angular/core';
import { BetMutation, BetQuery } from 'src/app/models/bets';
import { Category } from 'src/app/models/category';
import { Team } from 'src/app/models/team';
import { Event } from 'src/app/models/events';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ContextMenu } from 'src/app/models/context-menu';
import { ApolloQueryResult } from 'apollo-client';
import { AppService } from 'src/app/app.service';
import { TeamBet } from 'src/app/models/team-bet';

@Injectable({
  providedIn: 'root'
})
// Los servicios son clases que sirven para interconectar los componentes
// y reulizar funciones entre los componentes.
export class BetsService {
  public betQuery: BetQuery;
  public betMutation: BetMutation;
  public betsQuery: BetQuery[] = [];
  public category: Category;
  public contextMenu: ContextMenu[] = [];
  constructor(private apollo: Apollo, private appService: AppService) {}

  // por ejemplos todos las funciones que hay aqui solo reciben parametros y retornan un observable
  // el observable es una llamada al servidor que obtiene los datos un query
  // en este caso obtiene la lista de las apuestas
  public betsListSubscription(): Observable<{ data: { bets: BetQuery[] } }> {
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

  public insertBets(betMutation: BetMutation): Observable<any> {
    this.appService.show();
    console.log(betMutation);
    return this.apollo.mutate<Query>({
      mutation: gql`
        mutation insert_bets($objects: [bets_insert_input!]!) {
          insert_bets(objects: $objects) {
            affected_rows
          }
        }
      `,
      variables: {
        objects: betMutation
      }
    });
  }

  public getCategoriesTeamsEvents() {
    this.appService.show();
    return this.apollo.watchQuery<{ categories: Category[]; teams: Team[]; events: Event[] }>({
      query: gql`
        {
          categories {
            description
            id
            name
            sequence
          }
          teams {
            description
            id
            logoUrl
            name
          }
          events {
            id
            name
          }
        }
      `
    });
  }

  public getBetsById(id: number): Observable<ApolloQueryResult<{ bets: BetQuery[] }>> {
    this.appService.show();
    return this.apollo.watchQuery<{ bets: BetQuery[] }>({
      query: gql`{
        bets(where: {id: {_eq: ${id}}}) {
          createdAt
    createdBy
    description
    eventDate
    eventUrl
    id
    placeId
    siteId
    title
    team_bets {
      team {
        id
        name
        description
        logoUrl
      }
    }
    categoryId
  }
}
      `
    }).valueChanges;
  }

  public getBetsByIdWithCatTeams(
    id: number
  ): Observable<ApolloQueryResult<{ bets: BetQuery[]; categories: Category[]; teams: Team[] }>> {
    this.appService.show();
    return this.apollo.watchQuery<{ bets: BetQuery[]; categories: Category[]; teams: Team[] }>({
      query: gql`{
        bets(where: {id: {_eq: ${id}}}) {
          createdAt
    createdBy
    description
    eventDate
    eventUrl
    id
    placeId
    siteId
    title
    team_bets {
      team {
        id
        name
        description
        logoUrl
      }
    }
    categoryId
    event {
      id
      name
    }
  }
  categories {
    id
    name
    sequence
    description
  }
  teams {
    id
    logoUrl
    name
    description
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

  public updateBet(bet: BetMutation, category: Category, teams: TeamBet[]) {
    this.appService.show();
    this.betMutation = bet;
    this.category = category;
    return this.apollo.mutate<Query>({
      mutation: gql`
        mutation {
          update_bets(
            where: { id: { _eq: ${this.betMutation.id} } }
            _set: {
              title: "${this.betMutation.title}"
              siteId: ${this.betMutation.siteId}
              placeId: ${this.betMutation.placeId}
              eventUrl: "${this.betMutation.eventUrl}"
              description: "${this.betMutation.description}"
              createdBy: ${this.betMutation.createdBy}
              createdAt: "${new Date().toJSON()}"
              categoryId: ${this.betMutation.categoryId}
              eventDate: "${new Date(this.betMutation.eventDate).toJSON()}"
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
