import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import {
  MatListModule
} from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ReportService } from 'app/report.service';
import { Report } from 'app/report';

import { ReportListComponent } from './report-list.component';

class MockReportService {
  get() : Observable<Report[]> {
    var reports = [
      {
        name: "generic-name",
        slug: "",
        dataSet: "",
        templateName: "",
        headerColumns: [],
        contentColumns: []
      }
    ];
    return Observable.of<Report[]>(reports);
  }
}

describe('ReportListComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListComponent ],
      imports: [ MatListModule, RouterModule ],
      providers: [
        { provide: ReportService, useClass: MockReportService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('fetches reports', async(() => {
    component._promiseWaiter.then((reports) => {
      expect(reports).toBeTruthy();
      expect(reports[0].name).toBe("generic-name");
    });
  }));
});
