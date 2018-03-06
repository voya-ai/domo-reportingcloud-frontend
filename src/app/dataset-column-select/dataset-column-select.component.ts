import { Component, Input, OnInit } from '@angular/core';

import { DatasetColumn } from 'app/dataset-column';

@Component({
  selector: 'app-dataset-column-select',
  templateUrl: './dataset-column-select.component.html',
  styleUrls: ['./dataset-column-select.component.css']
})
export class DatasetColumnSelectComponent implements OnInit {
  @Input() columns: DatasetColumn[] = [];
  @Input() title: string;
  @Input() checkedField: string;

  constructor() { }

  ngOnInit() {
  }

}
