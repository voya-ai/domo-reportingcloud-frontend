import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { ReportService } from './report.service';

import { APP_CONFIG, AppConfig } from './app.config';

const mockResponse = [
  { id: 0, name: 'Report 0' },
  { id: 1, name: 'Report 1' }
];

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        ReportService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should return an Observable<Array<Report>>', inject([ReportService, XHRBackend], (service, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    service.get().subscribe(function(reports) {
      expect(reports.length).toBe(2);
      expect(reports[0].name).toEqual('Report 0');
      expect(reports[1].name).toEqual('Report 1');
    });
  }));
});
