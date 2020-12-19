import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefCodesHeaderComponent } from './add-ref-codes-header.component';

describe('AddRefCodesHeaderComponent', () => {
  let component: AddRefCodesHeaderComponent;
  let fixture: ComponentFixture<AddRefCodesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRefCodesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRefCodesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
