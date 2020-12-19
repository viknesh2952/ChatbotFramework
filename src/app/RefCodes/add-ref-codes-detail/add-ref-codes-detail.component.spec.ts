import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefCodesDetailComponent } from './add-ref-codes-detail.component';

describe('AddRefCodesDetailComponent', () => {
  let component: AddRefCodesDetailComponent;
  let fixture: ComponentFixture<AddRefCodesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRefCodesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRefCodesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
