
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MonthlyReportPage } from './monthly-report.page';

describe('MonthlyReportPage', () => {
  let component: MonthlyReportPage;
  let fixture: ComponentFixture<MonthlyReportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyReportPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: {} },
        { provide: AuthenticationService, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
