import { Component, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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
    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
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
