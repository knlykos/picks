import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import { CategoriesCreateComponent } from './bets/categories-create/categories-create.component';
// import { BetsCreateComponent } from './bets-create/bets-create.component';
import { ClarityModule } from '@clr/angular';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AppAlertComponent } from './shared/app-alert/app-alert.component';
// import { TeamsCreateComponent } from './teams-create/teams-create.component';

// import { TeamsListComponent } from './teams-list/teams-list.component';

@NgModule({
  declarations: [AdminPanelComponent, AppAlertComponent],
  imports: [CommonModule, FormsModule, ClarityModule, ReactiveFormsModule, AdminPanelRoutingModule]
})
export class AdminPanelModule {}
