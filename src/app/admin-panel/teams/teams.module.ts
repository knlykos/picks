import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TeamsRoutingModule } from './teams-routing.module';
import {
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule
} from '@angular/material';
import { TeamsUpdateComponent } from './teams-update/teams-update.component';

@NgModule({
  declarations: [TeamsCreateComponent, TeamsListComponent, TeamsUpdateComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class TeamsModule {}
