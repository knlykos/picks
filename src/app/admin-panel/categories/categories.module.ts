import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesCreateComponent } from './categories-create/categories-create.component';
import { ClarityModule } from '@clr/angular';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesCreateComponent],
  imports: [CommonModule, CategoriesRoutingModule, ClarityModule, FormsModule]
})
export class CategoriesModule {}
