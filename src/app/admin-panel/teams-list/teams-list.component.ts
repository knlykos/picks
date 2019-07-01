import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = [];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .subscribe<Query>({
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
      })
      .subscribe(value => {
        this.teams = value.data.teams;
      });
  }
}
