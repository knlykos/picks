import { Component, OnInit } from '@angular/core';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Bet } from 'src/app/models/bets';
import { BetsService } from '../bets.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { TableTitle } from 'src/app/models/table';
import { startWith, endWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '../../shared/admin-panel.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {
  public selectedBet: Bet = null;
  public betsTableTitle: TableTitle[] = [
    { title: 'Apuesta', icon: null, style: 'text-align: right' },
    { title: 'Ganador', icon: null, style: 'text-align: right' },
    { title: 'Fecha', icon: null, style: 'text-align: right' },
    { title: 'Categoria', icon: null, style: 'text-align: right' },
    { title: 'URL', icon: null, style: 'text-align: right' }
  ];
  public bets: Bet[] = [];
  public contextMenu: ContextMenu[] = [];
  public categories: Category[];
  constructor(
    private apollo: Apollo,
    private betsService: BetsService,
    private route: ActivatedRoute,
    private adminPanelService: AdminPanelService
  ) {
    this.adminPanelService.toolbarStruct = [
      {
        id: 'guardar',
        name: 'GUARDAR',
        fnName: 'insertBets',
        icon: null
      },
      {
        id: 'cancelar',
        name: 'CANCELAR',
        fnName: 'cancel',
        icon: null
      }
    ];
    // this.betsService.getCategories().subscribe(value => {
    //   this.categories = value.data.categories;
    // });
    this.contextMenu = [
      {
        id: 'btn-new',
        title: 'NUEVO',
        cssClass: 'btn btn-primary',
        tooltip: 'Crear una nueva apuesta',
        url: ['create'],
        disabled: false
      },
      {
        id: 'btn-edit',
        title: 'EDITAR',
        cssClass: 'btn',
        tooltip: 'Edita la apuesta seleccionada',
        url: ['update'],
        disabled: true
      }
    ];
    this.betsService.contextMenu = this.contextMenu;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { bets: { data: { bets: Bet[] } } }) => {
      this.bets = data.bets.data.bets;
    });
    this.route.data.subscribe((data: { categories: { data: { categories: Category[] } } }) => {
      this.categories = data.categories.data.categories;
    });
  }
  goToUpdate() {
    this.betsService.bet = this.selectedBet;
  }

  selectionChanged(id: number) {
    this.contextMenu[1].url = ['update', id.toString()];
  }

  getCategoryById(categoryId: number): string {
    let categoryName = 'Sin cantegoría';
    this.categories.map(v => {
      if (v.id === categoryId) {
        categoryName = v.name;
      }
    });
    return categoryName;
  }
}
