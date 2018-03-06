import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TemplateService } from 'app/template.service';

@Component({
  selector: 'app-report-template-autocomplete',
  templateUrl: './report-template-autocomplete.component.html',
  styleUrls: ['./report-template-autocomplete.component.css']
})
export class ReportTemplateAutocompleteComponent implements OnInit {
  templateControl = new FormControl();
  @Input() templateName: any;
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  filteredTemplateOptions: string[];
  templateLoading: boolean = false;

  constructor(private _templateService: TemplateService) {}

  ngOnInit() {
    this.templateControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((val : string) => {
        this.templateLoading = true;
        this._templateService.search(val)
        .toPromise()
        .then(function(result : Array<any>) {
          this.templateLoading = false;
          this.filteredTemplateOptions = result;
        }.bind(this));
      });

    if(this.templateName) {
      this.templateLoading = true;
      this._templateService.get(this.templateName)
        .subscribe((template: any) => {
          this.templateLoading = false;
          this.templateControl.setValue(template);
          this.selectionChanged(template);
        });
    }
  }

  selectionChanged(option: any) {
    this.onSelectionChange.emit(option);
  }

  displayTemplate(template : any) : string {
    return template ? template.templateName : template;
  }
}
