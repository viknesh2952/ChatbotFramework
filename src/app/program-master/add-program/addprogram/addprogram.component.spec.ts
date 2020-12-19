import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprogramComponent } from './addprogram.component';

describe('AddprogramComponent', () => {
  let component: AddprogramComponent;
  let fixture: ComponentFixture<AddprogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
