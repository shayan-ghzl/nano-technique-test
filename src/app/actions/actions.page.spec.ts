
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ActionsPage } from './actions.page';

describe('ActionsPage', () => {
  let component: ActionsPage;
  let fixture: ComponentFixture<ActionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthenticationService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: ApiService, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
