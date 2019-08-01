import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Category } from 'src/app/models/category';
import { Event } from 'src/app/models/events';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormGroup, FormControl } from '@angular/forms';
import { EventsService } from '../events.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { stringify } from '@angular/compiler/src/util';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material';
import { TeamsService } from '../../teams/teams.service';

@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss']
})
export class EventsCreateComponent implements OnInit {
  public event: Event = {
    name: null
  };
  public basic = true;
  public category: Category = { id: 1, description: null, name: null, sequence: null };
  public categories: Category[] = [{ description: null, id: null, name: null, sequence: null }];
  public contextMenu: ContextMenu[] = [];

  public eventsForm = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private adminPanelService: AdminPanelService,
    private router: Router,
    private appService: AppService,
    private snackbar: MatSnackBar,

  ) {
    this.adminPanelService._toolbarStruct.next([
      {
        id: 'guardar',
        name: 'GUARDAR',
        color: 'primary',
        fnName: 'insertEvents',
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
    this.appService.hide();
    this.onchange();
    this.getCategories();
    this.adminPanelService.onAction().subscribe(value => {
      this[value]();
    });
  }
  onchange() {
    this.eventsForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  public formToModel() {
    this.event = this.eventsForm.getRawValue();
  }

  public getCategories() {
    this.eventsService.getCategories().subscribe(value => {
      this.categories = value.data.categories;
    });
  }

  public insertEvents() {
    this.formToModel();

    this.eventsService.insertEvents(this.event, this.category).subscribe(value => {
      this.appService.show();
      this.snackbar.open('Se creo el evento ' + this.event.name, '', { duration: 5000 });
      this.router.navigateByUrl('/admin/events');
    });
  }

  public cancel() {
    this.router.navigateByUrl('/admin/events');
  }


}
