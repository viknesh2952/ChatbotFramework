import { TestBed } from '@angular/core/testing';

import { SubModuleapiService } from './sub-moduleapi.service';

describe('SubModuleapiService', () => {
  let service: SubModuleapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubModuleapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
