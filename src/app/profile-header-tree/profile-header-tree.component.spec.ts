import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderTreeComponent } from './profile-header-tree.component';

describe('ProfileHeaderTreeComponent', () => {
  let component: ProfileHeaderTreeComponent;
  let fixture: ComponentFixture<ProfileHeaderTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHeaderTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHeaderTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
