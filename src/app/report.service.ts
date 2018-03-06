import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from './app.config';
import { Report } from './report';

@Injectable()
export class ReportService {
  constructor(
    private _http: Http,
    @Inject(APP_CONFIG) private config
  ) {}

  save(report: Report) : Observable<Report> {
    return this._http.post(`${this.config.apiEndpoint}/reports`, report)
      .map(res => res.json());
  }

  get() : Observable<Report[]> {
    return this._http.get(`${this.config.apiEndpoint}/reports`)
      .map(res => res.json());
  }

  getOne(slug: string) {
    return this._http.get(`${this.config.apiEndpoint}/reports/${slug}`)
      .map(res => res.json());
  }

  update(report: Report) {
    return this._http.patch(`${this.config.apiEndpoint}/reports`, report)
      .map(res => res.json());
  }

  generate(report: Report, settings: any) {
    return this._http.post(`${this.config.apiEndpoint}/reports/${report.slug}/generate`, settings)
      .map(res => res.text())
      .toPromise()
      .then((url : string) => {
        window.open(url);
      });
  }

  sample(report: Report, settings: any) {
    return this._http.post(`${this.config.apiEndpoint}/reports/${report.slug}/sample`, settings)
      .map(res => res.text());
  }

}
