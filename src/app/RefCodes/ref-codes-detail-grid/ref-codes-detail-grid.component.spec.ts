import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCodesDetailGridComponent } from './ref-codes-detail-grid.component';

describe('RefCodesDetailGridComponent', () => {
  let component: RefCodesDetailGridComponent;
  let fixture: ComponentFixture<RefCodesDetailGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefCodesDetailGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefCodesDetailGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
