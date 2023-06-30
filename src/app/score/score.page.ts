import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppSegment } from '../shared/components/segment/segment.component';
import { IonContent } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { ApiService } from '../shared/services/api.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScorePage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content!: IonContent;

  scoreForm = new FormGroup({
    ResultOfService: new FormControl({value: 'done', disabled: false}, { validators: [Validators.required] }),
    DescOfService: new FormControl({value: '', disabled: false}),
    SrrPlaceOfEndingInstall : new FormControl({value: '', disabled: false}, { validators: [Validators.required] }),
    pImage: new FormControl({value: [], disabled: false}, { validators: [Validators.required] }),
    servicerPointOfService: new FormControl({disabled: false}, { validators: [Validators.required] }),
    servicerPointOfClientLearning: new FormControl({disabled: false}, { validators: [Validators.required] }),
    servicerPointOfClientSatisfy: new FormControl({disabled: false}, { validators: [Validators.required] }),
  });

  showSpinner = false;
  showToastMessage = false;
  toastMessage = '';

  segmentValue = '1';

  segment: AppSegment[] = [
    {
      label: 'شرح پروژه',
      value: '1'
    },
    {
      label: 'امتیازها',
      value: '2'
    },
    {
      label: 'تصاویر',
      value: '3'
    },
  ];

  subscription = new Subscription();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() { 
  }

  ionViewWillEnter() {
    this.printCurrentPosition();
  }

  segmentChanged() {
    this.content.scrollToTop();
  }

  async submit(){
    if (this.scoreForm.invalid) {
      return;
    }
    this.scoreForm.disable({emitEvent: false});
    this.showSpinner = true;

    await this.printCurrentPosition();
    console.log(this.scoreForm.value);

    this.subscription.add(
      this.apiService.postInstallationResult(this.scoreForm.value).pipe(
        tap(response => {
          if(response){
            this.toastMessage = 'گزارش با موفقیت ثبت شد.';
          } else {
            this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
            this.scoreForm.enable({emitEvent: false});
          }
          this.showToastMessage = true;
          this.showSpinner = false;
        })
      ).subscribe()
    );

  }

  async printCurrentPosition(){
    await Geolocation.getCurrentPosition()
      .then((coordinates) => {
        this.scoreForm.patchValue({'SrrPlaceOfEndingInstall': `${coordinates.coords.latitude}#${coordinates.coords.longitude}`}, { emitEvent: false });
        console.log('Current position:', coordinates);
      })
      .catch((error) => {
        console.log('display a button to retry geolocation');
      });
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  } 

}
