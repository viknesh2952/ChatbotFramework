import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramRoleComponent } from './add-program-role.component';

describe('AddProgramRoleComponent', () => {
  let component: AddProgramRoleComponent;
  let fixture: ComponentFixture<AddProgramRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
