import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  declarations: [TeamsCreateComponent, TeamsListComponent],
  imports: [CommonModule, TeamsRoutingModule, FormsModule, ClarityModule, ReactiveFormsModule]
})
export class TeamsModule {}
