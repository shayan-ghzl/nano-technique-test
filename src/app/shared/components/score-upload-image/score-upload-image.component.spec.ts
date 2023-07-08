import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { ScoreUploadImageComponent } from './score-upload-image.component';

describe('ScoreUploadImageComponent', () => {
  let component: ScoreUploadImageComponent;
  let fixture: ComponentFixture<ScoreUploadImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreUploadImageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
