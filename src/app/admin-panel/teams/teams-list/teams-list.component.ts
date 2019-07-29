import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { TeamsService } from '../teams.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = [];
  constructor(
    private apollo: Apollo,
    private adminPanelService: AdminPanelService,
    private teamsService: TeamsService,
    private appService: AppService
  ) {
    this.adminPanelService._toolbarStruct.next([]);
  }

  ngOnInit() {
    this.teamsService.getTeamsList().subscribe(value => {
      this.teams = value.data.teams;
      this.appService.hide();
    });
  }
}
