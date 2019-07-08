import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetsCreateComponent } from './bets-create/bets-create.component';
import { BetsListComponent } from './bets-list/bets-list.component';
import { BetsUpdateComponent } from './bets-update/bets-update.component';

const routes: Routes = [
  {
    path: '',
    component: BetsListComponent
  },
  { path: 'create', component: BetsCreateComponent },
  { path: 'update/:id', component: BetsUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetsRoutingModule {}
