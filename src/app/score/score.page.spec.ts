
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { TabsPage } from '../tabs/tabs.page';
import { ScorePage } from './score.page';

class TabsPageMock{
  tabPressed = new Subject();
}

describe('ScorePage', () => {
  let component: ScorePage;
  let fixture: ComponentFixture<ScorePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScorePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: {} },
        { provide: TabsPage, useClass: TabsPageMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
