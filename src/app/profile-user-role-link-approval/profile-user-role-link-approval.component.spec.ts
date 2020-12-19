import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserRoleLinkApprovalComponent } from './profile-user-role-link-approval.component';

describe('ProfileUserRoleLinkApprovalComponent', () => {
  let component: ProfileUserRoleLinkApprovalComponent;
  let fixture: ComponentFixture<ProfileUserRoleLinkApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserRoleLinkApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserRoleLinkApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
