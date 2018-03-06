import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { DatasetService } from './dataset.service';

import { APP_CONFIG, AppConfig } from './app.config';

const mockResponse = {
  data: [
    { id: 0, name: 'Dataset 0' },
    { id: 1, name: 'Dataset 1' },
    { id: 2, name: 'Dataset 2' },
    { id: 3, name: 'Dataset 3' },
  ]
};

const mockDatasetColumnResponse = {
  schema: {
    columns: [
      {
        name: "Florian"
      },
      {
        name: "Pepijn"
      },
      {
        name: "Nicole"
      }
    ]
  }
}

describe('DatasetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
          { provide: APP_CONFIG, useValue: AppConfig },
           DatasetService,
           { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should sort the DatasetColumns', inject([DatasetService, XHRBackend], (service, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockDatasetColumnResponse)
      })));
    });

    service.getColumns("test").subscribe(function(columns) {
      expect(columns.length).toBe(3);
      expect(columns[0].name).toEqual('Florian');
      expect(columns[1].name).toEqual('Nicole');
      expect(columns[2].name).toEqual('Pepijn');
    });
  }));

  it('should return an Observable<Array<Dataset>>', inject([DatasetService, XHRBackend], (service, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    service.search("test").subscribe(function(datasets) {
      expect(datasets.length).toBe(4);
      expect(datasets[0].name).toEqual('Dataset 0');
      expect(datasets[1].name).toEqual('Dataset 1');
      expect(datasets[2].name).toEqual('Dataset 2');
      expect(datasets[3].name).toEqual('Dataset 3');
    });
  }));
});
