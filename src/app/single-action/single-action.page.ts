import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { AuthenticationService } from '../shared/services/authentication.service';
import * as pako from 'pako';
import { IAction } from '../shared/models/models';

@Component({
  selector: 'app-single-action',
  templateUrl: './single-action.page.html',
  styleUrls: ['./single-action.page.scss'],
})
export class SingleActionPage implements OnInit, OnDestroy {

  hasActionStarted = false;
  assignedItem = false;
  coordinates = '';
  errorMessage = '';
  showToastError = false;
  isAlertOpen = false;

  actionData!: IAction;

  alertButtons = [
    {
      text: 'بله',
      role: 'confirm',
      handler: async () => {
        this.hasActionStarted = true; 
        this.isAlertOpen = false;
        await this.showLoading();
        await this.printCurrentPosition();
        if (this.coordinates) {
          this.subscription.add(
            this.apiService.postStartInstallation({
              "servicerID": this.authenticationService.servicerId,
              "idR_ID": this.actionData.idrRid,
              "placeOfBeginInstall": this.coordinates
            }).pipe(
              tap(response => {
                this.loading.dismiss();
                if (response) {
                  this.hasActionStarted = true;       
                } else {
                  this.errorMessage = 'موقعیت مکانی شما دردسترس نیست.';
                  this.showToastError = true;
                }
              })
            ).subscribe()
          );
        } else {
          this.errorMessage = 'موقعیت مکانی شما دردسترس نیست.';
          this.showToastError = true;
          this.loading.dismiss();
        }
      },
    },
    {
      text: 'خیر',
      role: 'cancel'
    }
  ];

  subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    // this.subscription.add(
    //   this.activatedRoute.paramMap.subscribe(params => {
    //     console.log(params.get('actionId')); 
    //   })
    // );
  }
  
  ionViewWillEnter() {
    this.assignedItem = this.router.url.includes('read-only');
    const deviceId = +(this.activatedRoute.snapshot.paramMap.get('actionId') || 'null');
    if (isNaN(deviceId)) {
        this.navController.navigateRoot('/tabs/home');
        return;
    }
    this.subscription.add(
      this.apiService.getDeviceById(deviceId).pipe(
        tap(response => {
          if (response) {
            this.actionData = JSON.parse(this.decompressGZip(response.RData))[0];
          } else {
            this.navController.navigateRoot('/tabs/home');
          }
        })
      ).subscribe()
    );
  }

  async printCurrentPosition(){
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
      });
  }

  async geoGetCurrentPosition(){
    await Geolocation.getCurrentPosition()
      .then((coordinates) => {
        this.coordinates = `${coordinates.coords.latitude}#${coordinates.coords.longitude}`;
      })
      .catch((error) => {
        this.coordinates = '';
        console.log('Geolocation get Position denied');
      });
  }

  async geoRequestPermissions(){
    await Geolocation.requestPermissions()
      .then(async (response) => {
        if (response.location == 'granted') {
          await this.geoGetCurrentPosition();
        } else {
          console.log('Geolocation request Permissions denied');
        }
      })
      .catch((error) => {
        console.log('Geolocation request Permissions denied');
      });
  }

  loading!: HTMLIonLoadingElement;
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'منتظر بمانید...',
    });
    this.loading.present();
  }

  decompressGZip(inputString: string): string {
    const strData = atob(inputString);
    const charData = strData.split('').map(x => x.charCodeAt(0));
    const compressedData = new Uint8Array(charData);
    const decompressedData = pako.inflate(compressedData);
    return  new TextDecoder().decode(decompressedData);
  }

  ngOnDestroy(): void {
    console.log('singleAction ngOnDestroy'); 
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  } 

}
