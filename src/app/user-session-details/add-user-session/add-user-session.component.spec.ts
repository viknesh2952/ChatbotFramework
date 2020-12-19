import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserSessionComponent } from './add-user-session.component';

describe('AddUserSessionComponent', () => {
  let component: AddUserSessionComponent;
  let fixture: ComponentFixture<AddUserSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
