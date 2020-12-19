import { TestBed } from '@angular/core/testing';

import { MenunameService } from './menuname.service';

describe('MenunameService', () => {
  let service: MenunameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenunameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
