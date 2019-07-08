import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel/admin-panel.component';
import { MainPanelComponent } from './dashboard/main-panel/main-panel.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
    // children: [
    //   { path: 'bets', component: BetsCreateComponent },
    //   { path: 'teams', component: TeamsCreateComponent },
    //   { path: 'teams-list', component: TeamsListComponent},
    //   { path: 'categories', component: CategoriesCreateComponent }
    // ]
  },
  { path: 'dashboard', component: MainPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
