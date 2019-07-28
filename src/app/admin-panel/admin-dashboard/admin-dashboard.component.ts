import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AdminPanelService } from '../shared/admin-panel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/app.service';

export interface ToolbarStruct {
  id: string;
  name: string;
  color: string;
  fnName: string;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        return result.matches;
      }),
      share()
    );

  public btnLaunch: Observable<string>;
  public toolbarStruct: ToolbarStruct[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private adminPanelService: AdminPanelService,
    private spinner: NgxSpinnerService
  ) {
    this.adminPanelService._toolbarStruct.subscribe(value => {
      // aqui se ejecuta y llena una lista
      // con el valor que recibe del subscribe
      this.toolbarStruct = value;
    });
  }

  ngOnInit() {}

  private launchAction(fnName: string): void {
    this.adminPanelService._onAction.next(fnName);
  }
}
