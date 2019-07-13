import { Component, OnInit } from '@angular/core';

export interface AppLevelAlert {
  type: 'info' | 'warning' | 'success' | 'danger';
  text: string;
  action: string;
}


@Component({
  selector: 'app-app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.scss']
})
export class AppAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
