import { Component, OnInit } from '@angular/core';
import { Team } from './../../../models/team';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {
  team: Team = { name: null, description: null, logoUrl: null };
  constructor(private apollo: Apollo) {}

  ngOnInit() {}

  insertTeam() {
    this.apollo
      .mutate<Query>({
        mutation: gql`
          mutation {
            insert_teams(objects: { description: "${this.team.description}", logo_url: "${
          this.team.logoUrl
        }", name: "${this.team.name}" }) {
          returning {
            id
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
