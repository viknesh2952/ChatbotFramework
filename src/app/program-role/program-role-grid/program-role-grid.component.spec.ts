import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramRoleGridComponent } from './program-role-grid.component';

describe('ProgramRoleGridComponent', () => {
  let component: ProgramRoleGridComponent;
  let fixture: ComponentFixture<ProgramRoleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramRoleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramRoleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
