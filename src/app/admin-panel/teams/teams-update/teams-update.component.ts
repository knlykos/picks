import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { BetMutation } from 'src/app/models/bets';
import { TeamsService } from '../teams.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AppAlertService } from '../../shared/app-alert/app-alert.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BetsResolverReturn } from '../../shared/resolvers/bets-resolver.service';
import { BetResolverReturn } from '../../shared/resolvers/bet-resolver.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { MatSnackBar } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-teams-update',
  templateUrl: './teams-update.component.html',
  styleUrls: ['./teams-update.component.scss'],
  providers: [DatePipe]
})
export class TeamsUpdateComponent implements OnInit, OnDestroy {
  public requestsCount = 0;
  public isLoading: boolean;
  public team: Team = { id: null, name: null, description: null, logoUrl: null };
  private alertBtn$: Subscription;

  public teamsForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    description: [null, Validators.required],
    logoUrl: [1, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private adminPanelService: AdminPanelService,
    private appService: AppService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackbar: MatSnackBar
  ) {
    this.adminPanelService._toolbarStruct.next([
      { id: 'update', color: 'primary', fnName: 'updateTeams', icon: '', name: 'ACTUALIZAR' },
      { id: 'cancel', color: '', fnName: 'cancelBet', icon: '', name: 'CANCELAR' }
    ]);

    this.adminPanelService.onAction().subscribe(value => {
      this[value]();
    });
  }

  ngOnInit() {
    this.appService.show();

    // this.route.data.subscribe((data: BetResolverReturn) => {
    //   this.bet = data.bets.data.bets[0];
    //   if (this.bet.hasOwnProperty('__typename')) {
    //     // tslint:disable-next-line: no-string-literal
    //     delete this.bet['__typename'];
    //   }
    //   this.betsForm.setValue(this.bet);
    // });
    this.route.params.subscribe(value => {
      // tslint:disable-next-line: no-shadowed-variable
      this.teamsService.getTeamsById(Number(value.id)).subscribe(value => {
        this.team = value.data.teams[0];
        if (this.team.hasOwnProperty('__typename')) {
          // tslint:disable-next-line: no-string-literal
          delete this.team['__typename'];
        }

        this.teamsForm.setValue(this.team);
        this.appService.hide();
      });
    });
    // this.betsForm.setValue(this.betsService.bet);
    // const data = this.betsForm
    //   .get(['createdAt'])
    //   .setValue(this.datePipe.transform(this.bet.createdAt, 'MM/dd/yyyy'));
    this.team = this.teamsService.team;
  }

  ngOnDestroy(): void {}
  private hideSpinner() {
    this.requestsCount += 1;
    if (this.requestsCount === 2) {
      this.appService.hide();
    }
  }

  public updateTeams() {
    const team: Team = this.teamsForm.getRawValue();
    this.appService.show();
    this.teamsService.updateTeam(team).subscribe(value => {
      // console.log(value.data.update_bets.returning[0].id);
      const name = value.data.update_teams.returning[0].name;

      this.snackbar.open('Se actualizó el equipo: ' + name, '', {
        horizontalPosition: 'left',
        duration: 5000
      });
      this.router.navigateByUrl('/admin/teams');
    });
  }

  public cancelBet() {
    this.spinner.show();
    this.snackbar.open('No se realizo algún cambio', '', {
      horizontalPosition: 'left',
      duration: 5000
    });
    this.router.navigateByUrl('/admin/teams');
  }
}
