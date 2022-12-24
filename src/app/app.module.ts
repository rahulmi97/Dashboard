import { MaterialModule } from './shared/modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { DetailListComponent } from './core/detail-list/detail-list.component';
import { ConfirmationModalComponent } from './shared/components/modal/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailListComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
