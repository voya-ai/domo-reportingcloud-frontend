import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromPromise';

import { DatasetService } from 'app/dataset.service';
import { ReportService } from 'app/report.service';

import { DatasetColumn } from 'app/dataset-column';
import { Report } from 'app/report';

import { Router } from '@angular/router';

@Component({
  selector: 'app-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.css']
})

export class ReportAddComponent implements OnInit {
  reportName: string;
  headerColumns: DatasetColumn[] = [];
  contentColumns: DatasetColumn[] = [];

  selectedDataset: any;
  selectedTemplate: any;

  columnsLoading: boolean = false;

  constructor(private _datasetService: DatasetService,
    private _reportService: ReportService,
    private _router: Router)
  { }

  ngOnInit() {}

  datasetSelectionChanged(selection) {
    this.selectedDataset = selection;
    this.headerColumns = [];
    this.contentColumns = [];

    this.columnsLoading = true;

    this._datasetService.getColumns(selection.id)
      .toPromise()
      .then(function(columns : Array<DatasetColumn>) {
        this.columnsLoading = false;
        
        // deep copy columns
        this.headerColumns = columns.map(function(column) {
          return { ...column };
        });
        this.contentColumns = columns.map(function(column) {
          return { ...column };
        });


      }.bind(this));

  }

  templateSelectionChanged(selection) {
    this.selectedTemplate = selection;
  }

  save() {
    this._reportService.save({
      name: this.reportName,
      slug: "",
      dataSet: this.selectedDataset.id,
      templateName: this.selectedTemplate.templateName,
      headerColumns: this.headerColumns.filter(column => column.checked).map(column => column.name),
      contentColumns: this.contentColumns.filter(column => column.checked).map(column => column.name)
    }).toPromise()
    .then(function(report: Report) {
      this._router.navigateByUrl(`report/${report.slug}`);
    }.bind(this));
  }
}
