import { Component, OnInit } from '@angular/core';
import { Team } from './../../../models/team';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-create',
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss']
})
export class TeamsCreateComponent implements OnInit {
  team: Team = { name: null, description: null, logoUrl: null };
  constructor(
    private apollo: Apollo,
    private adminPanelService: AdminPanelService,
    private router: Router
  ) {
    this.adminPanelService._toolbarStruct.next([
      { id: 'update', color: 'primary', fnName: 'insertTeam', icon: '', name: 'GUARDAR' },
      { id: 'cancel', color: 'warn', fnName: 'cancelTeam', icon: '', name: 'CANCELAR' }
    ]);
    this.adminPanelService.onAction().subscribe(value => {
      this[value]();
    });
  }

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
  cancelTeam() {
    this.router.navigateByUrl('/admin/teams');
  }
}
