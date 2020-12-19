import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulegroupMasterGridComponent } from './modulegroup-master-grid.component';

describe('ModulegroupMasterGridComponent', () => {
  let component: ModulegroupMasterGridComponent;
  let fixture: ComponentFixture<ModulegroupMasterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulegroupMasterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulegroupMasterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
