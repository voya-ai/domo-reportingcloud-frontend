import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {
  MatAutocompleteModule
} from '@angular/material';

import { TemplateService } from 'app/template.service';

import 'rxjs/add/observable/of';

import { ReportTemplateAutocompleteComponent } from './report-template-autocomplete.component';

class MockTemplateService {}

describe('ReportTemplateAutocompleteComponent', () => {
  let component: ReportTemplateAutocompleteComponent;
  let fixture: ComponentFixture<ReportTemplateAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateService, useClass: MockTemplateService }
      ],
      declarations: [ ReportTemplateAutocompleteComponent ],
      imports: [
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateAutocompleteComponent);
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
