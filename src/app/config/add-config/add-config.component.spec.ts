import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { addConfigComponent } from 'src/app/config/add-config/add-config.component';

describe('addconfigComponent', () => {
  let component: addConfigComponent;
  let fixture: ComponentFixture<addConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
