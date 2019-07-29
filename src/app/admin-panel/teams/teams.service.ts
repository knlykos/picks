import { Injectable } from '@angular/core';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Team } from 'src/app/models/team';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  team: Team;
  teams: Team[] = [];

  constructor(private apollo: Apollo, private appService: AppService) {}

  public getTeamsList(): Observable<{ data: { teams: Team[] } }> {
    return this.apollo.subscribe<Query>({
      query: gql`
        subscription {
          teams {
            id
            name
            logoUrl
            description
          }
        }
      `
    });
  }

  public getTeamsById(id: number): Observable<ApolloQueryResult<{ teams: Team[] }>> {
    this.appService.show();
    return this.apollo.watchQuery<{ teams: Team[] }>({
      query: gql`{
        teams(where: {id: {_eq: ${id}}}) {
          id
          name
          description
          logoUrl
        }
      }
      `
    }).valueChanges;
  }

  public updateTeam(team: Team) {
    this.appService.show();
    this.team = team;

    return this.apollo.mutate<Query>({
      mutation: gql`
        mutation {
          update_teams(
            where: { id: { _eq: ${this.team.id} } }
            _set: {
              name: "${this.team.name}"
              description: "${this.team.description}"
              logoUrl: "${this.team.logoUrl}"

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
}
