import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleGridComponent } from './sub-module-grid.component';

describe('SubModuleGridComponent', () => {
  let component: SubModuleGridComponent;
  let fixture: ComponentFixture<SubModuleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
