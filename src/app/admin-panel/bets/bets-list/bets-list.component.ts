import { Component, OnInit } from '@angular/core';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Bet } from 'src/app/models/bets';
import { BetsService } from '../bets.service';
import { ContextMenu } from 'src/app/models/context-menu';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {
  public selectedBet: Bet = null;
  public bets: Bet[] = [];
  public contextMenu: ContextMenu[] = [];
  constructor(private apollo: Apollo, private betsService: BetsService) {
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
    this.betsService.betsListSubscription().subscribe((value: { data: { bets: Bet[] } }) => {
      this.bets = value.data.bets;
    });
  }
  goToUpdate() {
    this.betsService.bet = this.selectedBet;
  }

  selectionChanged(id: number) {
    console.log(id);
    this.contextMenu[1].url = ['update', id.toString()];
  }
}
