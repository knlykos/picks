import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [MainPanelComponent],
  imports: [
    CommonModule, ClarityModule
  ]
})
export class DashboardModule { }
