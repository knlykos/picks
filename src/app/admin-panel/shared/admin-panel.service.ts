import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ToolbarStruct } from './../admin-dashboard/admin-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  // tslint:disable-next-line: variable-name
  public readonly _onAction = new Subject<string>();
  toolbarStruct: ToolbarStruct[];
  constructor() {}

  public onAction(): Observable<string> {
    return this._onAction.asObservable();
  }
}
