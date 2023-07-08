
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { SplashScreenPage } from './splash-screen.page';

describe('SplashScreenPage', () => {
  let component: SplashScreenPage;
  let fixture: ComponentFixture<SplashScreenPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplashScreenPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: NavController, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
