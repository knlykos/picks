import { Component, OnInit, OnDestroy } from '@angular/core';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Event } from 'src/app/models/events';
import { EventsService } from '../events.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { TableTitle } from 'src/app/models/table';
import { startWith, endWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
  public selectedEvent: Event = null;
  public eventsTableTitle: TableTitle[] = [
    { title: 'Nombre', icon: null, style: 'text-align: right' }
  ];
  public events: Event[] = [];
  public contextMenu: ContextMenu[] = [];
  public categories: Category[];
  private eventsPrefetch: Subscription;
  private categoriesPrefetch: Subscription;

  constructor(
    private apollo: Apollo,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private adminPanelService: AdminPanelService,
    private appService: AppService
  ) {
    this.adminPanelService._toolbarStruct.next([]);
  }

  ngOnInit() {
    this.eventsPrefetch = this.route.data.subscribe(
      (data: { events: { data: { events: Event[] } } }) => {
        this.appService.hide();
        this.events = data.events.data.events;
      }
    );
    this.categoriesPrefetch = this.route.data.subscribe(
      (data: { categories: { data: { categories: Category[] } } }) => {
        this.appService.hide();
        this.categories = data.categories.data.categories;
      }
    );
  }

  ngOnDestroy() {
    this.categoriesPrefetch.unsubscribe();
    this.eventsPrefetch.unsubscribe();
  }
  goToUpdate() {
    this.eventsService.event = this.selectedEvent;
  }

  selectionChanged(id: number) {
    this.contextMenu[1].url = ['update', id.toString()];
  }

  getCategoryById(categoryId: number): string {
    let categoryName = 'Sin categoría';
    this.categories.map(v => {
      if (v.id === categoryId) {
        categoryName = v.name;
      }
    });
    return categoryName;
  }
}
