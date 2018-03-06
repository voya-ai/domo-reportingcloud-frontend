import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from './app.config';
import { DatasetColumn } from './dataset-column';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class DatasetService {
  private data : Observable<any[]>;

  constructor(
    private _http: Http,
    @Inject(APP_CONFIG) private config
  ) {
    this.data = this._http.get(`${this.config.apiEndpoint}/datasets`)
      .map(res => res.json())
      .shareReplay(1);
  }

  search(term: string) : Observable<any[]> {
    return this.data
      .map
      (data => {
        return data.filter(item => {
          return item.name.search(new RegExp(term, "i")) !== -1;
        });
      });
  }

  get(id: string) : Observable<any> {
    return this._http.get(`${this.config.apiEndpoint}/datasets/${id}`)
      .map(res => res.json());
  }

  getColumns(id: string) : Observable<DatasetColumn[]> {
    return this.get(id)
      .map(res => res.schema.columns.map(column => {
        return {
          name: column.name,
          headerChecked: false,
          contentChecked: false
        }
      })).map(data => {
        return data.sort((a, b) => {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
      });
  }

}
