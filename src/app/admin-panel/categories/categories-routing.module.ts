import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
