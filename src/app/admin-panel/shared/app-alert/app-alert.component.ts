import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Subject, Observable } from 'rxjs';
import { AppAlertDirective } from './app-alert.directive';
import { AppAlertService } from './app-alert.service';

export interface AppLevelAlert {
  type: 'info' | 'warning' | 'success' | 'danger';
  text: string;
  action: string;
}

@Component({
  selector: 'app-app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppAlertComponent implements OnInit, OnDestroy {
  @Input() appAlerts: AppLevelAlert;
  @ViewChild(AppAlertDirective, { static: true }) appAlert: AppAlertDirective;
  data: AppLevelAlert;

  constructor(private appAlertService: AppAlertService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  public onAction() {
    this.appAlertService._onAction.next();
  }
}
