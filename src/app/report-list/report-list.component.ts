import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ReportService } from 'app/report.service';

import { Report } from 'app/report';

import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  _promiseWaiter: Promise<Report[]>;

  constructor(private _reportService: ReportService) {
    this._promiseWaiter = this._reportService.get()
      .toPromise()
      .then(function(reports: Report[]) {
        this.reports = reports;
        return reports;
      }.bind(this));
  }

  ngOnInit() {
  }
}
