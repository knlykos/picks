import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Category } from 'src/app/models/category';
import { BetMutation, BetQuery } from 'src/app/models/bets';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormGroup, FormControl } from '@angular/forms';
import { BetsService } from '../bets.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { stringify } from '@angular/compiler/src/util';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TeamsService } from '../../teams/teams.service';
import { Team } from 'src/app/models/team';
import { Event } from 'src/app/models/events';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { EventsService } from '../../events/events.service';

@Component({
  selector: 'app-bets-create',
  templateUrl: './bets-create.component.html',
  styleUrls: ['./bets-create.component.scss']
})
export class BetsCreateComponent implements OnInit {
  public events: Event[];
  public betMutation: BetMutation = {
    title: null,
    description: null,
    categoryId: null,
    eventDate: null,
    eventUrl: null,
    team_bets: { data: null }
  };
  public basic = true;
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];
  public contextMenu: ContextMenu[] = [];

  public teamOneId: FormControl = new FormControl(null, Validators.required);
  public teamTwoId: FormControl = new FormControl(null, Validators.required);
  public betsForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required],
    eventDate: [null, Validators.required],
    eventUrl: [null, Validators.required],
    eventId: [null, Validators.required]
  });
  private teams: Team[];
  public teamsOne: Team[];
  public teamsTwo: Team[];

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private betsService: BetsService,
    private adminPanelService: AdminPanelService,
    private router: Router,
    private appService: AppService,
    private teamsService: TeamsService,
    private snackbar: MatSnackBar,
    private eventsService: EventsService
  ) {
    this.adminPanelService._toolbarStruct.next([
      {
        id: 'guardar',
        name: 'GUARDAR',
        color: 'primary',
        fnName: 'insertBets',
        icon: null
      },
      {
        id: 'cancelar',
        name: 'CANCELAR',
        color: 'warn',
        fnName: 'cancel',
        icon: null
      }
    ]);
  }

  ngOnInit() {
    this.onchange();
    // this.getCategories();
    this.adminPanelService.onAction().subscribe(value => {
      // if (this.betsForm.valid === true && value === 'insertBets') {
      this[value]();
      // } else if (value === 'cancel') {
      //   this[value]();
      // } else {
      //   this.snackbar.open('Completa el formulario para continuar', 'CERRAR', { duration: 5000 });
      // }
    });
    // this.getTeamsList();
    this.betsService.getCategoriesTeamsEvents().valueChanges.subscribe(value => {
      this.categories = value.data.categories;
      this.teamsOne = value.data.teams;
      this.teamsTwo = value.data.teams;
      this.teams = value.data.teams;
      this.events = value.data.events;
      this.appService.hide();
    });
  }
  onchange() {
    this.betsForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  public formToModel() {
    this.betMutation = this.betsForm.getRawValue();
    const eventName = this.betsForm.get('eventId').value;
    const eventId = this.eventsService.ChangeNameId(this.events, eventName);
    const teamOneName = this.teamOneId.value;
    const teamTwoName = this.teamTwoId.value;
    const teams = this.teamsService.teamNameToList(
      [teamOneName, teamTwoName],
      this.teams,
      this.betMutation.id
    );
    this.betMutation.team_bets = { data: teams };
    this.betMutation.eventId = eventId;
    this.betMutation.categoryId = this.category.id;
  }

  public getCategories() {
    this.betsService.getCategories().subscribe(value => {
      this.appService.hide();
      this.categories = value.data.categories;
    });
  }

  public insertBets() {
    this.formToModel();

    this.betsService.insertBets(this.betMutation).subscribe(
      value => {
        this.router.navigateByUrl('/admin/bets');
      },
      error => {
        this.snackbar.open(
          'No se guardó la apuesta, comprueba que el formulario sea correcto',
          'CERRAR',
          {
            duration: 5000
          }
        );
        this.appService.hide();
      }
    );
    // } else {
    //   this.snackbar.open(
    //     'No se guardó la apuesta, comprueba los nombres de los equipos',
    //     'CERRAR',
    //     {
    //       duration: 5000
    //     }
    //   );
    // }
  }

  public getTeamsList() {
    this.teamsService.getTeamsList().subscribe(value => {
      this.teams = value.data.teams;
      this.teamsOne = value.data.teams;
      this.teamsTwo = value.data.teams;
    });
  }

  public cancel() {
    this.router.navigateByUrl('/admin/bets');
  }
}
