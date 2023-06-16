import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScorePage } from './score.page';

describe('ScorePage', () => {
  let component: ScorePage;
  let fixture: ComponentFixture<ScorePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
