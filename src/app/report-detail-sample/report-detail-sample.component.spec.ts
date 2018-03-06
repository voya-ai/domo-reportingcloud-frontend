import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  MatCheckboxModule
} from '@angular/material';

import { Report } from 'app/report';
import { ReportService } from 'app/report.service';

import 'rxjs/add/observable/of';

import { ReportDetailSampleComponent } from './report-detail-sample.component';

class MockReportService {}

describe('ReportDetailSampleComponent', () => {
  let component: ReportDetailSampleComponent;
  let fixture: ComponentFixture<ReportDetailSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ReportService, useClass: MockReportService },
      ],
      declarations: [ ReportDetailSampleComponent ],
      imports: [
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailSampleComponent);
    component = fixture.componentInstance;
    component.report = {
      name: "Test",
      slug: "test",
      headerColumns: []

    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
