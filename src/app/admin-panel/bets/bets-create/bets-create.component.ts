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
    categoryId: [1, Validators.required],
    eventDate: [null, Validators.required],
    eventUrl: [null, Validators.required]
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private betsService: BetsService,
    private adminPanelService: AdminPanelService
  ) {
    this.contextMenu = [
      {
        id: 'btn-save',
        title: 'GUARDAR',
        cssClass: 'btn btn-primary',
        tooltip: 'Crear una nueva apuesta',
        url: [''],
        disabled: false,
        functionName: 'insertBets'
      },
      {
        id: 'btn-cancel',
        title: 'CANCELAR',
        cssClass: 'btn',
        tooltip: 'Cancela la apuesta actual',
        url: ['/admin/bets'],
        disabled: false
      }
    ];
    this.betsService.contextMenu = this.contextMenu;
    this.adminPanelService.toolbarStruct = [
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
        color: 'primary',
        fnName: 'cancel',
        icon: null
      }
    ];
  }

  ngOnInit() {
    this.onchange();
    this.getCategories();
    this.adminPanelService.onAction().subscribe(value => {
      this[value]();
    });
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
      this.categories = value.data.categories;
    });
  }

  public insertBets() {
    this.formToModel();

    const returnedValue = this.betsService.insertBets(this.bet, this.category);
  }
}
