import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Bet } from 'src/app/models/bets';
import { BetsService } from '../bets.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppAlertService } from '../../shared/app-alert/app-alert.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bets-update',
  templateUrl: './bets-update.component.html',
  styleUrls: ['./bets-update.component.scss'],
  providers: [DatePipe]
})
export class BetsUpdateComponent implements OnInit, OnDestroy {
  public bet: Bet = { title: null, description: null, categoryId: null, createdAt: null };
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];
  private alertBtn$: Subscription;
  gql: `{
    bets(where: {id: {_eq: 10}}) {
      categoryId
      createdAt
      createdBy
      description
      event
      eventUrl
      id
      placeId
      siteId
      title
    }
  }
  `;

  public contextMenu: ContextMenu[] = [];

  public betsForm = this.fb.group({
    id: [null],
    title: [null, Validators.required],
    description: [null, Validators.required],
    categoryId: [1, Validators.required],
    createdAt: [null, Validators.required],
    createdBy: [null],
    eventUrl: [null, Validators.required],
    event: [null],
    placeId: [null],
    siteId: [null]
  });
  constructor(
    private fb: FormBuilder,
    private betsService: BetsService,
    private route: ActivatedRoute,
    private appAlertService: AppAlertService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.contextMenu = [
      {
        id: 'btn-save',
        title: 'GUARDAR',
        cssClass: 'btn btn-primary',
        tooltip: 'Crear una nueva apuesta',
        url: [''],
        disabled: false,
        functionName: 'updateBet'
      },
      {
        id: 'btn-update',
        title: 'CANCELAR',
        cssClass: 'btn',
        tooltip: 'Edita la apuesta seleccionada',
        url: ['update'],
        disabled: false,
        functionName: 'updateBet'
      }
    ];
  }

  ngOnInit() {
    this.alertBtn$ = this.appAlertService.onAction().subscribe(() => {
      this.printSomething();
    });

    this.getCategories();
    this.route.params.subscribe(value => {
      // tslint:disable-next-line: no-shadowed-variable
      this.betsService.getBetsById(Number(value.id)).subscribe(value => {
        this.bet = value.data.bets[0];
        if (this.bet.hasOwnProperty('__typename')) {
          // tslint:disable-next-line: no-string-literal
          delete this.bet['__typename'];
        }
        this.betsForm.setValue(this.bet);
        // this.betsForm
        //   .get('createdAt')
        //   .setValue(this.datePipe.transform(value.data.bets[0].createdAt, 'MM/dd/yyyy'));
      });
    });
    // this.betsForm.setValue(this.betsService.bet);
    // const data = this.betsForm
    //   .get(['createdAt'])
    //   .setValue(this.datePipe.transform(this.bet.createdAt, 'MM/dd/yyyy'));
    this.bet = this.betsService.bet;
  }

  ngOnDestroy(): void {
    this.alertBtn$.unsubscribe();
  }

  public getCategories() {
    this.betsService.getCategories().subscribe(value => {
      this.categories = value.data.categories;
    });
  }

  private printSomething() {
    console.log('Fix');
  }

  public updateBet() {
    const bet: Bet = this.betsForm.getRawValue();
    this.betsService.updateBet(bet, this.category);
  }

  public cancelBet() {
    this.router.navigateByUrl('/admin/bets');
  }
}
