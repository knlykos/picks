import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Event } from 'src/app/models/events';
import { EventsService } from '../events.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppAlertService } from '../../shared/app-alert/app-alert.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { EventResolverReturn } from '../../shared/resolvers/event-resolver.service';
import { AdminPanelService } from '../../shared/admin-panel.service';

@Component({
  selector: 'app-events-update',
  templateUrl: './events-update.component.html',
  styleUrls: ['./events-update.component.scss'],
  providers: [DatePipe]
})
export class EventsUpdateComponent implements OnInit, OnDestroy {
  public event: Event = { name };
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];
  private alertBtn$: Subscription;

  private eventsPrefetch$: Subscription;

  private categoriesPrefetch$: Subscription;

  public contextMenu: ContextMenu[] = [];

  public eventsForm = this.fb.group({
    name: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private appAlertService: AppAlertService,
    private router: Router,
    private adminPanelService: AdminPanelService
  ) {
    this.adminPanelService._toolbarStruct.next([
      {
        id: 'actualizar',
        name: 'ACTUALIZAR',
        color: 'primary',
        fnName: 'updateEvent',
        icon: null
      },
      {
        id: 'cancelar',
        name: 'CANCELAR',
        color: '',
        fnName: 'cancel',
        icon: null
      }
    ]);
  }

  ngOnInit() {
    this.eventsPrefetch$ = this.route.data.subscribe((data: EventResolverReturn) => {
      this.event = data.events.data.events[0];
      console.log(this.event);
      if (this.event.hasOwnProperty('__typename')) {
        // tslint:disable-next-line: no-string-literal
        delete this.event['__typename'];
      }
      this.eventsForm.setValue(this.event);
    });
    this.event = this.eventsService.event;
    this.alertBtn$ = this.adminPanelService.onAction().subscribe(value => {
      this[value]();
    });
  }

  ngOnDestroy(): void {
    this.alertBtn$.unsubscribe();
    this.eventsPrefetch$.unsubscribe();
  }

  public getCategories() {
    this.categoriesPrefetch$ = this.route.data.subscribe(
      (data: { categories: { data: { categories: Category[] } } }) => {
        console.log(data.categories.data.categories);
        this.categories = data.categories.data.categories;
      }
    );
  }

  private printSomething() {
    console.log('Fix');
  }

  public updateEvent() {
    const event: Event = this.eventsForm.getRawValue();
    this.route.params.subscribe((value: { id: number }) => {
      console.log(value.id);
      this.event = { id: value.id, name: event.name };
    });
    this.eventsService.updateEvent(this.event);
  }

  public cancel() {
    this.router.navigateByUrl('/admin/events');
  }
}
