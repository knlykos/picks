import { Injectable } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { mapTo, scan, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private spinnerTopRef: OverlayRef;

  public spin$: Subject<boolean> = new Subject();

  constructor(private overlay: Overlay) {
    this.spinnerTopRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    // this.spin$
    //   .asObservable()
    //   .pipe(
    //     scan((acc, next) => {
    //       if (!next) {
    //         return 0;
    //       }
    //       return acc + next >= 0 ? acc + next : 0;
    //     }, 0),
    //     map(val => val > 0),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(res => {
    //     if (res) {
    //       this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
    //     } else if (this.spinnerTopRef.hasAttached()) {
    //       this.spinnerTopRef.detach();
    //     }
    //   });
  }
  show() {
    this.spin$.next(true);
  }
  hide() {
    this.spin$.next(false);
  }


  // reset() {
  //   this.spin$.next(0);
  // }
}
