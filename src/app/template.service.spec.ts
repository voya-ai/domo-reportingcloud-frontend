import {
  HttpModule,
  Http,
  Response,
  ConnectionBackend,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { TemplateService } from './template.service';

import { APP_CONFIG, AppConfig } from './app.config';

const mockResponse = [
  { id: 0, name: 'Template 0' },
  { id: 1, name: 'Template 1' }
];

describe('TemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: AppConfig },
        TemplateService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should return an Observable<Array<Template>>', inject([TemplateService, XHRBackend], (service, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    mockBackend.connections.subscribe((connection: any) => this.lastConnection = connection);

    service.search("sample").subscribe(function(templates) {
      expect(templates.length).toBe(2);
      expect(templates[0].name).toEqual('Template 0');
      expect(templates[1].name).toEqual('Template 1');
      expect(this.lastConnection.request.url).toMatch(/api\/templates\?name=sample$/, 'url invalid');
    }.bind(this));
  }));
});
