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
import {
  MatMenuModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { TeamsCreateComponent } from './teams-create/teams-create.component';

// import { TeamsListComponent } from './teams-list/teams-list.component';
// Este es el archivo de configuración del modulo de admin,
@NgModule({
  // Sirve para lllamar a los componentes que va a usar el modulo
  declarations: [
    AdminPanelComponent,
    AppAlertComponent,
    AppAlertDirective,
    AdminDashboardComponent
  ],
  // Sirve para importar los modulos que se van a utilizar en el modulo
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule, // Routeador del modulo de admin
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule
  ]
})
export class AdminPanelModule {}
