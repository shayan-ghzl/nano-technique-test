import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyReportPage } from './monthly-report.page';

describe('MonthlyReportPage', () => {
  let component: MonthlyReportPage;
  let fixture: ComponentFixture<MonthlyReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MonthlyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
