import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Category } from 'src/app/models/category';
import { Bet } from 'src/app/models/bets';
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
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bets-create',
  templateUrl: './bets-create.component.html',
  styleUrls: ['./bets-create.component.scss']
})
export class BetsCreateComponent implements OnInit {
  public bet: Bet = {
    title: null,
    description: null,
    categoryId: null,
    eventDate: null,
    eventUrl: null
  };
  public basic = true;
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];
  public contextMenu: ContextMenu[] = [];

  public betsForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [null, Validators.required],
    eventDate: [null, Validators.required],
    eventUrl: [null, Validators.required],
    teamOneId: [null, Validators.required],
    teamTwoId: [null, Validators.required]
  });

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
    private snackbar: MatSnackBar
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
    this.getCategories();
    this.adminPanelService
      .onAction()
      .pipe(take(1))
      .subscribe(value => {
        if (this.betsForm.valid === true && value === 'insertBets') {
          this[value]();
        } else if (value === 'cancel') {
          this[value]();
        } else {
          this.snackbar.open('Completa el formulario para continuar', 'CERRAR', { duration: 5000 });
        }
      });
    this.getTeamsList();
  }
  onchange() {
    this.betsForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  public formToModel() {
    this.bet = this.betsForm.getRawValue();
  }

  public getCategories() {
    this.betsService.getCategories().subscribe(value => {
      this.appService.hide();
      this.categories = value.data.categories;
    });
  }

  public insertBets() {
    this.formToModel();

    const returnedValue = this.betsService.insertBets(this.bet, this.category);
    this.router.navigateByUrl('/admin/bets');
  }

  public getTeamsList() {
    this.teamsService.getTeamsList().subscribe(value => {
      this.teamsOne = value.data.teams;
      this.teamsTwo = value.data.teams;
    });
  }

  public cancel() {
    this.router.navigateByUrl('/admin/bets');
  }
}
