import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { ReportGenerationService } from './report-generation.service';

import { APP_CONFIG, AppConfig } from './app.config';

const mockResponse = [
  { id: 0, name: 'Report 0' },
  { id: 1, name: 'Report 1' }
];

describe('ReportGenerationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        ReportGenerationService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should return an Observable<Array<ReportGeneration>>', inject([ReportGenerationService, XHRBackend], (service, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    service.get().subscribe(function(reportGenerations) {
      expect(reportGenerations.length).toBe(2);
      expect(reportGenerations[0].name).toEqual('Report 0');
      expect(reportGenerations[1].name).toEqual('Report 1');
    });
  }));
});
