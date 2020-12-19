import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterComponent } from './program-master.component';

describe('ProgramMasterComponent', () => {
  let component: ProgramMasterComponent;
  let fixture: ComponentFixture<ProgramMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
