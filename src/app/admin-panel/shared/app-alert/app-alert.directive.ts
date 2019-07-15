import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAppAlert]'
})
export class AppAlertDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
