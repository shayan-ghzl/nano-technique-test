
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { SingleActionPage } from './single-action.page';


describe('SingleActionPage', () => {
  let component: SingleActionPage;
  let fixture: ComponentFixture<SingleActionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleActionPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: ApiService, useValue: {} },
        { provide: AuthenticationService, useValue: {} },
        { provide: NavController, useValue: {} },
        { provide: LoadingController, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
