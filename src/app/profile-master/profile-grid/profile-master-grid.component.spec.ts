import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMasterComponent } from './profile-master-grid.component';

describe('ProfileMasterGridComponent', () => {
  let component: ProfileMasterComponent;
  let fixture: ComponentFixture<ProfileMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
