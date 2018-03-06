import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule
} from '@angular/material';

import { DatasetColumnSelectComponent } from './dataset-column-select.component';

describe('DatasetColumnSelectComponent', () => {
  let component: DatasetColumnSelectComponent;
  let fixture: ComponentFixture<DatasetColumnSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetColumnSelectComponent ],
      imports: [
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetColumnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
