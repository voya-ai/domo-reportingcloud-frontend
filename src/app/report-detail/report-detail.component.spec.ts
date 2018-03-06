import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportDetailComponent } from './report-detail.component';
import { Observable } from 'rxjs/Observable';
import {
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router'

import { ActivatedRouteStub } from 'src/testing/router-stubs';
import { MockComponent } from 'src/testing/component-stubs';

import { Report } from 'app/report';
import { ReportService } from 'app/report.service';

import 'rxjs/add/observable/of';

class MockReportService {
  getOne(slug : string) : Observable<Report> {
    return Observable.of<Report>();
  }
}

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('ReportDetailComponent', () => {
  let component: ReportDetailComponent;
  let fixture: ComponentFixture<ReportDetailComponent>;

  beforeEach(async(() => {
    let activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { slug: 'invoice' };

    TestBed.configureTestingModule({
      providers: [
        { provide: ReportService, useClass: MockReportService },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
      declarations: [
        ReportDetailComponent,
        MockComponent({ selector: 'app-report-detail-sample', inputs: [ 'report' ] }),
        MockComponent({ selector: 'app-report-edit', inputs: [ 'report' ] })
      ],
      imports: [
        MatSelectModule,
        MatDatepickerModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed
      .createComponent(ReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
