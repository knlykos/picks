import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Bet } from 'src/app/models/bets';
import { BetsService } from '../bets/bets.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { BetsCreateComponent } from '../bets/bets-create/bets-create.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  updateItsDisabled = true;
  contextMenu: ContextMenu[];
  bets: Bet;

  constructor(private apollo: Apollo, private betsService: BetsService) {}

  ngOnInit() {
    this.contextMenu = this.betsService.contextMenu;
  }
  ngAfterViewInit(): void {}
  functionName(fnName: string) {
    // this.betsCreate[fnName]();
  }

  saveApuesta() {
    this.apollo
      .mutate<Query>({
        mutation: gql`
          mutation {
            insert_apuestas(objects: { apuesta: "${this.bets.title}", title: "${
          this.bets.description
        }" }) {
              returning {
                apuesta
                id
                title
              }
            }
          }
        `
      })
      .subscribe(value => {
        console.log(value);
      });
  }
}
