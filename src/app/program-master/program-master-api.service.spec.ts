import { TestBed } from '@angular/core/testing';

import { ProgramMasterApiService } from './program-master-api.service';

describe('ProgramMasterApiService', () => {
  let service: ProgramMasterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramMasterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
