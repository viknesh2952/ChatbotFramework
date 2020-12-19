import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleGroupComponent } from './add-module-group.component';

describe('AddModuleGroupComponent', () => {
  let component: AddModuleGroupComponent;
  let fixture: ComponentFixture<AddModuleGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModuleGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
