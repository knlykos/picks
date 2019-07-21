import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsCreateComponent } from './bets-create/bets-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BetsListComponent } from './bets-list/bets-list.component';
import { BetsUpdateComponent } from './bets-update/bets-update.component';
import {
  MatInputModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatCardModule,
  MatRippleModule
} from '@angular/material';

@NgModule({
  declarations: [BetsCreateComponent, BetsListComponent, BetsUpdateComponent],
  imports: [
    CommonModule,
    BetsRoutingModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatRippleModule
  ],
  providers: [MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class BetsModule {}
