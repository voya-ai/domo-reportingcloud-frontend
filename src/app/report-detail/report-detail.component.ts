import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ReportService } from 'app/report.service';

import { Report } from 'app/report';

import { Router, ActivatedRoute, ParamMap } from '@angular/router'

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

interface Timespan {
  value: number,
  label: string
}

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  report$: Observable<Report>;
  reportEditSubject: Subject<Report> = new Subject<Report>();
  childGroupColumns: any[];

  ranges: Timespan[] = [{
    value: 7,
    label: "Weekly"
  },
  {
    value: 28,
    label: "4 weeks"
  },
  {
    value: 0,
    label: "All time"
  }];
  timespan: any = 0;
  startDate: string;
  timeColumn: string;
  masterGroup: string;

  loading: boolean = false;

  constructor(private _reportService: ReportService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this.report$ = this._route.paramMap
      .switchMap((params: ParamMap) =>
        this._reportService.getOne(params.get('slug')))
      .merge(this.reportEditSubject);

    this.report$
      .subscribe((report : Report) => {
        this.childGroupColumns = report.headerColumns.map((column) => {
          return { name: column, childGroup: false }
        })
      });
  }

  generate(report: Report) {
    this.loading = true;

    this._reportService.generate(report, {
      childGroups: this.childGroupColumns.filter(column => column.childGroup).map(column => column.name),
      timeColumn: this.timeColumn,
      startDate: this.startDate,
      masterGroup: this.masterGroup,
      timespan: this.timespan
    }).then(function(url) {
      this.loading = false;
      this._router.navigateByUrl('/');
    }.bind(this), function(error) {
      this.loading = false;
      this._router.navigateByUrl('/');
    });
  }

  update(report: Report) {
    this.reportEditSubject.next(report);
  }
}
