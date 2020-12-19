import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGroupApprovalComponent } from './module-group-approval.component';

describe('ModuleGroupApprovalComponent', () => {
  let component: ModuleGroupApprovalComponent;
  let fixture: ComponentFixture<ModuleGroupApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleGroupApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGroupApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
