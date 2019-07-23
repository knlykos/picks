import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ToolbarStruct } from './../admin-dashboard/admin-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  // tslint:disable-next-line: variable-name
  public readonly _onAction = new Subject<string>();
  // tslint:disable-next-line: variable-name
  public readonly _toolbarStruct = new Subject<ToolbarStruct[]>();
  // tslint:disable-next-line: variable-name
  public readonly _spinner$ = new Subject<boolean>();
  toolbarStruct: ToolbarStruct[];
  constructor() {}

  public onAction(): Observable<string> {
    return this._onAction.asObservable();
  }

  public toolbarStructFn() {
    return this._toolbarStruct.asObservable();
  }

  public spinner(): Observable<boolean> {
    return this._spinner$.asObservable();
  }
}
