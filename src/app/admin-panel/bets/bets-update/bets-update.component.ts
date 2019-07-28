import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Bet } from 'src/app/models/bets';
import { BetsService } from '../bets.service';
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

@Component({
  selector: 'app-bets-update',
  templateUrl: './bets-update.component.html',
  styleUrls: ['./bets-update.component.scss'],
  providers: [DatePipe]
})
export class BetsUpdateComponent implements OnInit, OnDestroy {
  public requestsCount = 0;
  public isLoading: boolean;
  public bet: Bet = { title: null, description: null, categoryId: null, createdAt: null };
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];
  private alertBtn$: Subscription;

  public betsForm = this.fb.group({
    id: [null],
    title: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [1, Validators.required],
    createdAt: [null],
    createdBy: [null],
    eventUrl: [null, Validators.required],
    placeId: [null],
    siteId: [null],
    eventDate: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private betsService: BetsService,
    private route: ActivatedRoute,
    private adminPanelService: AdminPanelService,
    private appService: AppService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackbar: MatSnackBar
  ) {
    this.adminPanelService._toolbarStruct.next([
      { id: 'update', color: 'primary', fnName: 'updateBet', icon: '', name: 'ACTUALIZAR' },
      { id: 'cancel', color: '', fnName: 'cancelBet', icon: '', name: 'CANCELAR' }
    ]);

    this.adminPanelService.onAction().subscribe(value => {
      this[value]();
    });
  }

  ngOnInit() {
    this.appService.show();

    this.getCategories();

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
      this.betsService.getBetsById(Number(value.id)).subscribe(value => {
        this.bet = value.data.bets[0];
        if (this.bet.hasOwnProperty('__typename')) {
          // tslint:disable-next-line: no-string-literal
          delete this.bet['__typename'];
        }
        this.betsForm.setValue(this.bet);
        this.hideSpinner();
      });
    });
    // this.betsForm.setValue(this.betsService.bet);
    // const data = this.betsForm
    //   .get(['createdAt'])
    //   .setValue(this.datePipe.transform(this.bet.createdAt, 'MM/dd/yyyy'));
    this.bet = this.betsService.bet;
  }

  ngOnDestroy(): void {}
  private hideSpinner() {
    this.requestsCount += 1;
    if (this.requestsCount === 2) {
      this.appService.hide();
    }
  }
  public getCategories() {
    // this.route.data.subscribe((data: { categories: { data: { categories: Category[] } } }) => {
    //   console.log(data.categories.data.categories);
    //   this.categories = data.categories.data.categories;
    // });
    this.betsService.getCategories().subscribe(value => {
      this.categories = value.data.categories;
      this.hideSpinner();
    });
  }

  public updateBet() {
    const bet: Bet = this.betsForm.getRawValue();
    this.appService.show();
    this.betsService.updateBet(bet, this.category).subscribe(value => {
      // console.log(value.data.update_bets.returning[0].id);

      const title = value.data.update_bets.returning[0].title;

      this.snackbar.open('Se actualizó la apuesta: ' + title, '', {
        horizontalPosition: 'left',
        duration: 5000
      });
      this.router.navigateByUrl('/admin/bets');
    });
  }

  public cancelBet() {
    this.spinner.show();
    this.snackbar.open('No se realizo algún cambio', '', {
      horizontalPosition: 'left',
      duration: 5000
    });
    this.router.navigateByUrl('/admin/bets');
  }
}
