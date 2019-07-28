import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable } from 'apollo-link';
import gql from 'graphql-tag';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.appService.spin$.subscribe(value => {
      if (value === true) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
