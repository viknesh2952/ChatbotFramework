import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSessionGridComponent } from './user-session-grid.component';

describe('UserSessionGridComponent', () => {
  let component: UserSessionGridComponent;
  let fixture: ComponentFixture<UserSessionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSessionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSessionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
