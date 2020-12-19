import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMasterGridComponent } from './story-master-grid.component';

describe('StoryMasterGridComponent', () => {
  let component: StoryMasterGridComponent;
  let fixture: ComponentFixture<StoryMasterGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryMasterGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryMasterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
