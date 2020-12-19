import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { addroleComponent } from './add-role.component';

describe('addroleComponent', () => {
  let component: addroleComponent;
  let fixture: ComponentFixture<addroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
