import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetsCreateComponent } from './bets-create/bets-create.component';
import { BetsListComponent } from './bets-list/bets-list.component';
import { BetsUpdateComponent } from './bets-update/bets-update.component';
import { BetResolverService } from '../shared/resolvers/bet-resolver.service';
import { BetsResolverService } from '../shared/resolvers/bets-resolver.service';
import { CategoriesResolverService } from '../shared/resolvers/categories-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BetsListComponent,
    resolve: {
      bets: BetsResolverService,
      categories: CategoriesResolverService
    }
  },
  {
    path: 'create',
    component: BetsCreateComponent,
    resolve: {
      categories: CategoriesResolverService
    }
  },
  {
    path: 'update/:id',
    component: BetsUpdateComponent,
    resolve: {
      bets: BetResolverService,
      categories: CategoriesResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetsRoutingModule {}
