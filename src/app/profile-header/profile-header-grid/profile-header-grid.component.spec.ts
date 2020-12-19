import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileHeaderGridComponent } from './profile-header-grid.component';

describe('ProfileHeaderGridComponent', () => {
  let component: ProfileHeaderGridComponent;
  let fixture: ComponentFixture<ProfileHeaderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHeaderGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHeaderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
