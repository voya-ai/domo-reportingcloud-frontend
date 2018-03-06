import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatListModule
} from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ReportGeneration } from 'app/report-generation';
import { ReportGenerationService } from 'app/report-generation.service';

import { ReportGenerationListComponent } from './report-generation-list.component';

class MockReportGenerationService {
    get() : Observable<ReportGeneration[]> {
        return Observable.of<ReportGeneration[]>([]);
    }
}

describe('ReportGenerationListComponent', () => {
  let component: ReportGenerationListComponent;
  let fixture: ComponentFixture<ReportGenerationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: ReportGenerationService, useClass: MockReportGenerationService }
      ],
      declarations: [ ReportGenerationListComponent ],
      imports: [ MatListModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGenerationListComponent);
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
