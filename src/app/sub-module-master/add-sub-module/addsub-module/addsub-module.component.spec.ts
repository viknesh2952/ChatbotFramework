import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubModuleComponent } from './addsub-module.component';

describe('AddsubModuleComponent', () => {
  let component: AddsubModuleComponent;
  let fixture: ComponentFixture<AddsubModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
