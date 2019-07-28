import { Component, OnInit, ViewChild } from '@angular/core';
import { Query, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Bet } from 'src/app/models/bets';
import { BetsService } from '../bets.service';
import { ContextMenu } from 'src/app/models/context-menu';
import { TableTitle } from 'src/app/models/table';
import { startWith, endWith, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelService } from '../../shared/admin-panel.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {
  public requests = 0;
  public selectedBet: Bet = null;
  public betsTableTitle: TableTitle[] = [
    { title: 'id', icon: null, style: 'text-align: right' },
    { title: 'Apuesta', icon: null, style: 'text-align: right' },
    { title: 'Ganador', icon: null, style: 'text-align: right' },
    { title: 'Fecha', icon: null, style: 'text-align: right' },
    // { title: 'Categoria', icon: null, style: 'text-align: right' },
    { title: 'URL', icon: null, style: 'text-align: right' }
  ];

  public betsTitle = ['id', 'title', 'description', 'category', 'date', 'eventUrl'];
  public bets: Bet[] = [];
  public dataSource = new MatTableDataSource<Bet>(this.bets);
  public contextMenu: ContextMenu[] = [];
  public categories: Category[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // se utiliza la injeccion de dependencia es necesario leer y entender el termino
  // en el caso de betsService es un servicio importado, el chiste de la injeccion de dependecia
  // es importar todo sin necesidad de hacer import por cada dependencia que se utiliza
  constructor(
    private apollo: Apollo,
    private betsService: BetsService,
    private route: ActivatedRoute,
    private appService: AppService,
    private adminPanelService: AdminPanelService
  ) {
    this.adminPanelService._toolbarStruct.next([]);
    // this.betsService.getCategories().subscribe(value => {
    //   this.categories = value.data.categories;
    // });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // this.spinner.show();
    // this.route.data.subscribe((data: { bets: { data: { bets: Bet[] } } }) => {
    //   this.bets = data.bets.data.bets;
    // });
    this.betsService.betsListSubscription().subscribe(value => {
      // observable
      this.bets = value.data.bets;
      this.dataSource.data = this.bets;
      this.requests += 1;
      if (this.requests === 1) {
        this.appService.hide();
      }
    });

    this.betsService.getCategories().subscribe(value => {
      this.categories = value.data.categories;
      this.requests += 1;
      if (this.requests === 1) {
        this.appService.hide();
      }
    });
    // this.route.data.subscribe((data: { categories: { data: { categories: Category[] } } }) => {
    //   this.categories = data.categories.data.categories;
    // });
  }
  goToUpdate() {
    this.betsService.bet = this.selectedBet;
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
