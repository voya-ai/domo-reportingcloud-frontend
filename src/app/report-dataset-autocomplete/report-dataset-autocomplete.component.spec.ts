import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  MatAutocompleteModule
} from '@angular/material';

import { DatasetService } from 'app/dataset.service';

import 'rxjs/add/observable/of';

import { ReportDatasetAutocompleteComponent } from './report-dataset-autocomplete.component';

class MockDatasetService {
  search(val : string) : Observable<any[]> {
    return Observable.of<any[]>([]);
  }
}

describe('ReportDatasetAutocompleteComponent', () => {
  let component: ReportDatasetAutocompleteComponent;
  let fixture: ComponentFixture<ReportDatasetAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DatasetService, useClass: MockDatasetService }
      ],
      declarations: [ ReportDatasetAutocompleteComponent ],
      imports: [
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDatasetAutocompleteComponent);
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
