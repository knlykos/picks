import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Betts } from 'src/app/models/betts';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  betts: Betts;
  constructor(private apollo: Apollo) {}

  ngOnInit() {}

  saveApuesta() {
    this.apollo
      .mutate<Query>({
        mutation: gql`
          mutation {
            insert_apuestas(objects: { apuesta: "${this.betts.title}", title: "${
          this.betts.description
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
