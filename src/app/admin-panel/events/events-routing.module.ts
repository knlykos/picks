import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsUpdateComponent } from './events-update/events-update.component';
import { EventResolverService } from '../shared/resolvers/event-resolver.service';
import { EventsResolverService } from '../shared/resolvers/events-resolver.service';
import { CategoriesResolverService } from '../shared/resolvers/categories-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    resolve: {
      events: EventsResolverService,
      categories: CategoriesResolverService
    }
  },
  {
    path: 'create',
    component: EventsCreateComponent,
    resolve: {
      categories: CategoriesResolverService
    }
  },
  {
    path: 'update/:id',
    component: EventsUpdateComponent,
    resolve: {
      events: EventResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
