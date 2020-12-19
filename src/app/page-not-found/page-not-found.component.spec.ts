import { TestBed, async } from '@angular/core/testing';
import { Forms } from './page-not-found.component';

describe('Forms', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Forms
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Forms);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular8-reactive-forms'`, () => {
    const fixture = TestBed.createComponent(Forms);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular8-reactive-forms');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(Forms);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular8-reactive-forms!');
  });
});
