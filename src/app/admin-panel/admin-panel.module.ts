import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';
import { BettsCreateComponent } from './betts-create/betts-create.component';
import { ClarityModule } from '@clr/angular';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { AppRoutingModule } from '../app-routing.module';
import { TeamsListComponent } from './teams-list/teams-list.component';

@NgModule({
  declarations: [AdminPanelComponent, CategoriesCreateComponent, BettsCreateComponent, TeamsCreateComponent, TeamsListComponent],
  imports: [CommonModule, FormsModule, ClarityModule, ReactiveFormsModule, AppRoutingModule]
})
export class AdminPanelModule {}
