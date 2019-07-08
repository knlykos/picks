import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsCreateComponent } from './bets-create/bets-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BetsListComponent } from './bets-list/bets-list.component';
import { BetsUpdateComponent } from './bets-update/bets-update.component';

@NgModule({
  declarations: [BetsCreateComponent, BetsListComponent, BetsUpdateComponent],
  imports: [CommonModule, BetsRoutingModule, FormsModule, ClarityModule, ReactiveFormsModule]
})
export class BetsModule {}
