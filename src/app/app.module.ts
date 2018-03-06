import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import {
  MatAutocompleteModule,
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { APP_CONFIG, AppConfig } from './app.config';

import { ReportService } from './report.service';
import { DatasetService } from './dataset.service';
import { TemplateService } from './template.service';
import { ReportGenerationService } from './report-generation.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportAddComponent } from './report-add/report-add.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportDatasetAutocompleteComponent } from './report-dataset-autocomplete/report-dataset-autocomplete.component';
import { ReportTemplateAutocompleteComponent } from './report-template-autocomplete/report-template-autocomplete.component';
import { ReportGenerationListComponent } from './report-generation-list/report-generation-list.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailSampleComponent } from './report-detail-sample/report-detail-sample.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { DatasetColumnSelectComponent } from './dataset-column-select/dataset-column-select.component';

const appRoutes: Routes = [
    {
        path: 'report/add',
        component: ReportAddComponent
    },
    {
        path: 'report/:slug',
        component: ReportDetailComponent
    },
    {
        path: '',
        component: ReportsComponent,
        pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportAddComponent,
    ReportDetailComponent,
    ReportDatasetAutocompleteComponent,
    ReportTemplateAutocompleteComponent,
    ReportGenerationListComponent,
    ReportsComponent,
    ReportDetailSampleComponent,
    ReportEditComponent,
    DatasetColumnSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [
      { provide: APP_CONFIG, useValue: AppConfig },
      ReportService,
      DatasetService,
      TemplateService,
      ReportGenerationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
