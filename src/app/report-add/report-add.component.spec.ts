import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportAddComponent } from './report-add.component';
import {
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ReportService } from 'app/report.service';
import { DatasetService } from 'app/dataset.service';

import 'rxjs/add/observable/of';

import { MockComponent } from 'src/testing/component-stubs';

class MockDatasetService {}
class MockReportService {}

describe('ReportAddComponent', () => {
  let component: ReportAddComponent;
  let fixture: ComponentFixture<ReportAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DatasetService, useClass: MockDatasetService },
        { provide: ReportService, useClass: MockReportService }
      ],
      declarations: [
        ReportAddComponent,
        MockComponent({ selector: 'app-report-template-autocomplete'}),
        MockComponent({ selector: 'app-report-dataset-autocomplete' }),
        MockComponent({ selector: 'app-dataset-column-select', inputs: [ 'columns', 'title' ] })
      ],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAddComponent);
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
