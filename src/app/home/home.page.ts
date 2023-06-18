import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Subscription, delay, tap } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{

  showToastError = false;
  loading!: HTMLIonLoadingElement;

  subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) {
    // @ts-ignore:
    Date.prototype.nanoFormat = function(){

      let day: number | string = this.getDate();
      let month: number | string = this.getMonth() + 1;
      let year: number | string = this.getFullYear();
  
      day = day.toString().padStart(2, '0');
      month = month.toString().padStart(2, '0');

      return year + '-' + month + '-' + day;
      
      // OR
      // const d = new Date();
      // let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      // let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      // let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      // console.log(`${da}-${mo}-${ye}`);
   }

    // @ts-ignore:
    Date.prototype.daysAgo = function(days: number){
      const newDate = new Date(this);
      newDate.setDate(this.getDate() - days);
      return newDate;
    }
  }

  async logout(){
    await this.showLoading();
    this.subscription.add(
      this.authenticationService.logout().pipe(
        tap(response => {
          if(!response){
            this.showToastError = true;
          }
          this.loading.dismiss();
        })
      ).subscribe()
    );
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'منتظر بمانید...',
    });
    this.loading.present();
  }


  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  } 

}
