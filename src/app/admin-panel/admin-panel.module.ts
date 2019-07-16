import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import { CategoriesCreateComponent } from './bets/categories-create/categories-create.component';
// import { BetsCreateComponent } from './bets-create/bets-create.component';
import { ClarityModule } from '@clr/angular';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AppAlertComponent } from './shared/app-alert/app-alert.component';
import { AppAlertDirective } from './shared/app-alert/app-alert.directive';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { TeamsCreateComponent } from './teams-create/teams-create.component';

// import { TeamsListComponent } from './teams-list/teams-list.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AppAlertComponent,
    AppAlertDirective,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ]
})
export class AdminPanelModule {}
