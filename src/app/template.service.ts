import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from './app.config';

import 'rxjs/add/operator/map';

@Injectable()
export class TemplateService {
  constructor(
    private _http: Http,
    @Inject(APP_CONFIG) private config
  ) {}

  search(term: string) : Observable<any[]> {
    return this._http.get(`${this.config.apiEndpoint}/templates?name=${term}`)
      .map(res => res.json())
  }

  get(templateName: string) : Observable<any> {
    return this._http.get(`${this.config.apiEndpoint}/templates/${templateName}`)
      .map(res => res.json())
  }
}
