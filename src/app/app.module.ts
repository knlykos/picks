import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { AppInterceptorService } from './app-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    MatProgressSpinnerModule,
    GraphQLModule,
    HttpClientModule,
    AdminPanelModule,
    DashboardModule,
    ClarityModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,

    StoreModule.forRoot(reducers, { metaReducers })
  ],
  entryComponents: [MatSpinner],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
