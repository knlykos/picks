import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable } from 'apollo-link';
import gql from 'graphql-tag';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'realtimeapp';
  todos$: Observable<any>;

  constructor(private apollo: Apollo) {

  }

  ngOnInit() {

  }
}
