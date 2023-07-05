import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { IonContent } from '@ionic/angular';
import { Subscription, tap } from 'rxjs';
import { AppSegment } from '../shared/components/segment/segment.component';
import { ApiService } from '../shared/services/api.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content!: IonContent;

  scoreForm = new FormGroup({
    ResultOfService: new FormControl({ value: 'done', disabled: false }, { validators: [Validators.required] }),
    DescOfService: new FormControl({ value: '', disabled: false }),
    SrrPlaceOfEndingInstall: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
    pImage: new FormControl({ value: [], disabled: false }, { validators: [Validators.required] }),
    servicerPointOfService: new FormControl({ value: null, disabled: false }, { validators: [Validators.required] }),
    servicerPointOfClientLearning: new FormControl({ value: null, disabled: false }, { validators: [Validators.required] }),
    servicerPointOfClientSatisfy: new FormControl({ value: null, disabled: false }, { validators: [Validators.required] }),
  });

  showSpinner = false;
  showSpinnerRetryLoc = false;
  showToastMessage = false;
  toastMessage = '';
  
  _segmentValue = 1;

  get segmentValue() {
    return this._segmentValue;
  }

  set segmentValue(v) {
    this.Tabs.nextTabStatus = v;
    this._segmentValue = v;
  }
  
  segment: AppSegment[] = [
    {
      label: 'شرح پروژه',
      value: 1
    },
    {
      label: 'امتیازها',
      value: 2
    },
    {
      label: 'تصاویر',
      value: 3
    },
  ];

  subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private Tabs: TabsPage,
  ) {
      Tabs.nextTabStatus = 1;
  }

  ngOnInit() {
    this.subscription.add(
      this.Tabs.tabPressed.subscribe((response) => {
        if (response == 'next') {
          this.segmentValue = this.segmentValue + 1;
        } else {
          this.segmentValue = this.segmentValue - 1;
        }
      })
    );
  }

  ionViewWillEnter() {
    this.printCurrentPosition();
  }

  segmentChanged() {
    this.content.scrollToTop();
  }

  async submit() {
    if (this.scoreForm.invalid) {
      return;
    }
    this.scoreForm.disable({ emitEvent: false });
    this.showSpinner = true;

    await this.printCurrentPosition();
    console.log(this.scoreForm.value);

    this.subscription.add(
      this.apiService.postInstallationResult(this.scoreForm.value).pipe(
        tap(response => {
          if (response) {
            this.toastMessage = 'گزارش با موفقیت ثبت شد.';
          } else {
            this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
            this.scoreForm.enable({ emitEvent: false });
          }
          this.showToastMessage = true;
          this.showSpinner = false;
        })
      ).subscribe()
    );

  }

  async printCurrentPosition() {
    this.showSpinnerRetryLoc = true;
    await Geolocation.checkPermissions()
      .then(async (response) => {
        if (response.location == 'granted') {
          await this.geoGetCurrentPosition();
        } else {
          await this.geoRequestPermissions();
        }
      })
      .catch((error) => {
        console.log('Geolocation check permission denied');
        this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
        this.showToastMessage = true;
      });
  }

  async geoGetCurrentPosition() {
    await Geolocation.getCurrentPosition()
      .then((coordinates) => {
        this.scoreForm.patchValue({ 'SrrPlaceOfEndingInstall': `${coordinates.coords.latitude}#${coordinates.coords.longitude}` }, { emitEvent: false });
        console.log('Current position:', coordinates);
      })
      .catch((error) => {
        console.log('Geolocation get Position denied');
        this.toastMessage = 'موقعیت مکانی شما دردسترس نیست.';
        this.showToastMessage = true;
      })
      .finally(() => {
        this.showSpinnerRetryLoc = false;
      });
  }

  async geoRequestPermissions() {
    await Geolocation.requestPermissions()
      .then(async (response) => {
        if (response.location == 'granted') {
          await this.geoGetCurrentPosition();
        } else {
          console.log('Geolocation request Permissions denied');
          this.toastMessage = 'لطفا دسترسی لازم را بدهید.';
          this.showToastMessage = true;
        }
      })
      .catch((error) => {
        console.log('Geolocation request Permissions denied');
        this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
        this.showToastMessage = true;
      });
  }

  ngOnDestroy(): void {
    this.Tabs.nextTabStatus = 4;
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

}
