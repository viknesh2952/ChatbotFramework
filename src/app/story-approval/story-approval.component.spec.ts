import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryApprovalComponent } from './story-approval.component';

describe('StoryApprovalComponent', () => {
  let component: StoryApprovalComponent;
  let fixture: ComponentFixture<StoryApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
