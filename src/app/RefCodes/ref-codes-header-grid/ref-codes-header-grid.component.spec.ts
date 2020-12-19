import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCodesHeaderGridComponent } from './ref-codes-header-grid.component';

describe('RefCodesHeaderGridComponent', () => {
  let component: RefCodesHeaderGridComponent;
  let fixture: ComponentFixture<RefCodesHeaderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefCodesHeaderGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefCodesHeaderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
