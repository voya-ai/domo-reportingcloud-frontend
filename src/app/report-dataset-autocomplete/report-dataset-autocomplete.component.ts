import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DatasetService } from 'app/dataset.service';

@Component({
  selector: 'app-report-dataset-autocomplete',
  templateUrl: './report-dataset-autocomplete.component.html',
  styleUrls: ['./report-dataset-autocomplete.component.css']
})
export class ReportDatasetAutocompleteComponent implements OnInit {
  datasetControl = new FormControl();
  @Input() dataSet: any;
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  filteredDatasetOptions: string[];
  datasetLoading: boolean = false;

  constructor(private _datasetService: DatasetService) {}

  ngOnInit() {
    this.datasetControl
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((val : string) => {
        this.datasetLoading = true;
        this._datasetService.search(val)
        .toPromise()
        .then(function(result : Array<any>) {
          this.datasetLoading = false;
          this.filteredDatasetOptions = result;
        }.bind(this));
      });

    if(this.dataSet) {
      this.datasetLoading = true;
      this._datasetService.get(this.dataSet)
        .subscribe((dataset: any) => {
          this.datasetLoading = false;
          this.datasetControl.setValue(dataset);
          this.selectionChanged(dataset);
        });
    }
  }

  selectionChanged(option: any) {
    this.onSelectionChange.emit(option);
  }

  displayDataset(dataset : any) : string {
    return dataset ? dataset.name : dataset;
  }

}
