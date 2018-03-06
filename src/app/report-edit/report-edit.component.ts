import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { DatasetService } from 'app/dataset.service';
import { ReportService } from 'app/report.service';

import { DatasetColumn } from 'app/dataset-column';
import { Report } from 'app/report';

import { Router } from '@angular/router';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit {
  @Input() report: Report;
  @Output() update : EventEmitter<Report> = new EventEmitter<Report>();

  headerColumns: DatasetColumn[] = [];
  contentColumns: DatasetColumn[] = [];

  isEditing: boolean = false;
  columnsLoading: boolean = false;

  constructor(private _datasetService: DatasetService,
    private _reportService: ReportService,
    private _router: Router)
  { }

  ngOnInit() {
  }

  datasetSelectionChanged(selection) {
    this.report.dataSet = selection.id;
    this.headerColumns = [];
    this.contentColumns = [];

    this.columnsLoading = true;

    var report = this.report;

    this._datasetService.getColumns(selection.id)
      .subscribe((columns : Array<DatasetColumn>) => {
        this.columnsLoading = false;

        // deep copy columns
        this.headerColumns = columns.map(function(column) {
          var result = { ...column };
          if(report.headerColumns.includes(result.name)) {
            result.checked = true;
          }
          return result;
        });
        this.contentColumns = columns.map(function(column) {
          var result = { ...column };
          if(report.contentColumns.includes(result.name)) {
            result.checked = true;
          }
          return result;
        });
      });
  }

  templateSelectionChanged(selection) {
    this.report.templateName = selection.templateName;
  }

  edit() {
    this.isEditing = true;
  }

  save(report) {
    this.report.headerColumns = this.headerColumns.filter(column => column.checked).map(column => column.name);
    this.report.contentColumns = this.contentColumns.filter(column => column.checked).map(column => column.name);
    this._reportService.update(this.report)
      .subscribe((report: Report) => {
        this.isEditing = false;
        this.update.emit(report);
      });
  }
}
