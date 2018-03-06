import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from './app.config';
import { ReportGeneration } from './report-generation';

@Injectable()
export class ReportGenerationService {
  constructor(
    private _http: Http,
    @Inject(APP_CONFIG) private config
  ) {}

  get() : Observable<ReportGeneration[]> {
    return this._http.get(`${this.config.apiEndpoint}/reportGenerations`)
      .map(res => res.json());
  }
}
