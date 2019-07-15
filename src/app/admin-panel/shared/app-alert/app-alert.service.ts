import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAlertService implements OnDestroy {
  // tslint:disable-next-line: variable-name
  public readonly _onAction = new Subject<void>();
  constructor() {}

  ngOnDestroy(): void {}

  public onAction(): Observable<void> {
    return this._onAction.asObservable();
  }
}
