
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthenticationService } from '../shared/services/authentication.service';
import { TabsPage } from './tabs.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class ActivatedRouteMock {
  currentUser$ = of({value: []});
}

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthenticationService, useValue: {} },
        { provide: NavController, useValue: {} },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
