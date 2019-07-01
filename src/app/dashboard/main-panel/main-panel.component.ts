import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface Apuestas {
  id: number;
  title: string;
  apuesta: string;
}
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  apuestas: any[];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .subscribe<Query>({
        query: gql`
          subscription {
            betts {
              categoryId
              created_at
              created_by
              description
              event
              event_url
              id
              placeId
              siteId
              title
            }
          }
        `
      })
      .subscribe(value => {
        this.apuestas = value.data.betts;
      });
  }
}
