import { TestBed } from '@angular/core/testing';

import { ProfileTreeapiService } from './profile-treeapi.service';

describe('ProfileTreeapiService', () => {
  let service: ProfileTreeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTreeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
