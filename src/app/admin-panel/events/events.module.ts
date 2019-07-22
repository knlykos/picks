import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsCreateComponent } from './events-create/events-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsUpdateComponent } from './events-update/events-update.component';
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
  declarations: [EventsCreateComponent, EventsListComponent, EventsUpdateComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
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
export class EventsModule {}
