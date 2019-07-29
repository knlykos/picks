import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsCreateComponent } from './teams-create/teams-create.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamsUpdateComponent } from './teams-update/teams-update.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsListComponent
  },
  { path: 'create', component: TeamsCreateComponent },
  { path: 'update/:id', component: TeamsUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
