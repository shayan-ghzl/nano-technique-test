import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleActionPage } from './single-action.page';

describe('SingleActionPage', () => {
  let component: SingleActionPage;
  let fixture: ComponentFixture<SingleActionPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(SingleActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
