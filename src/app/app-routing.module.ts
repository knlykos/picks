import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel/admin-panel.component';
import { MainPanelComponent } from './dashboard/main-panel/main-panel.component';
import { TeamsCreateComponent } from './admin-panel/teams-create/teams-create.component';
import { BettsCreateComponent } from './admin-panel/betts-create/betts-create.component';
import { CategoriesCreateComponent } from './admin-panel/categories-create/categories-create.component';
import { TeamsListComponent } from './admin-panel/teams-list/teams-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: 'betts', component: BettsCreateComponent },
      { path: 'teams', component: TeamsCreateComponent },
      { path: 'teams-list', component: TeamsListComponent},
      { path: 'categories', component: CategoriesCreateComponent }
    ]
  },
  { path: 'dashboard', component: MainPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
