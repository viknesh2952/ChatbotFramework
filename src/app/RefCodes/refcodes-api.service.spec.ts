import { TestBed } from '@angular/core/testing';

import { RefcodesApiService } from './refcodes-api.service';

describe('RefcodesApiService', () => {
  let service: RefcodesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefcodesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
