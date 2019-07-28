import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesModule } from './categories/categories.module';
import { TeamsModule } from './teams/teams.module';

// misma dinamica del la importacion de modulo de admin
const routes: Routes = [
  {
    // el chiste es que se entra digamos la url https://localhost:4200/admin/bets
    path: 'bets',
    // practiicamente estoy llamando por medio del routeador el submodulo ejemplo .then(m => m.BetsModule)
    loadChildren: () => import('./bets/bets.module').then(m => m.BetsModule)
  },
  {
    // el chiste es que se entra digamos la url https://localhost:4200/admin/categories
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    // https://localhost:4200/admin/teams
    path: 'teams',
    loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule)
  },
  {
    // https://localhost:4200/admin/events
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {}
