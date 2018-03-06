import { Component, Input, OnInit } from '@angular/core';

import { ReportService } from 'app/report.service';

import { Report } from 'app/report';

@Component({
  selector: 'app-report-detail-sample',
  templateUrl: './report-detail-sample.component.html',
  styleUrls: ['./report-detail-sample.component.css']
})
export class ReportDetailSampleComponent implements OnInit {
  @Input() report: Report;

  childGroupColumns: any[];
  loading: boolean = false;
  data: string;

  constructor(private _reportService: ReportService) { }

  ngOnInit() {
    this.childGroupColumns = this.report.headerColumns.map((column) => {
      return { name: column, childGroup: false }
    });
  }

  sample(report: Report) {
    this.loading = true;
    this.data = null;

    this._reportService.sample(report, {
      childGroups: this.childGroupColumns.filter(column => column.childGroup).map(column => column.name)
    }).subscribe(data => {
      this.loading = false;
      this.data = data;
    });
  }
}
