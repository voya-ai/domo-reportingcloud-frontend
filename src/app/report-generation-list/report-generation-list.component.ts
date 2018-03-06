import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

import { ReportGenerationService } from 'app/report-generation.service';

import { ReportGeneration } from 'app/report-generation';

@Component({
  selector: 'app-report-generation-list',
  templateUrl: './report-generation-list.component.html',
  styleUrls: ['./report-generation-list.component.css']
})
export class ReportGenerationListComponent implements OnInit {
  reports: any[];

  constructor(private _reportService: ReportGenerationService) {
    this._reportService.get()
      .toPromise()
      .then(function(reports: ReportGeneration[]) {
        this.reports = reports
          .map(function(report : any) {
            report.url = `${environment.bucketUrl}${report.name}`;
            return report;
          });
      }.bind(this));
  }

  ngOnInit() {
  }
}
