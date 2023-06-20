import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Subscription, switchMap } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import * as pako from 'pako';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit, OnDestroy {

  items: any[] | null = null;

  subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
  ) {
   
   }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // @ts-ignore:
    const today = new Date().nanoFormat();
    // @ts-ignore:
    const monthAgo = new Date().daysAgo(30).nanoFormat();
    
    console.log(today, monthAgo);
    

    this.subscription.add(
      this.authenticationService.getAuthState$.pipe(
        switchMap(authState => {
          return this.apiService.getReadyDevices({ 'ServicerID': authState!.Key, 'AzDateCTI': today, 'TaDateCTI': monthAgo, 'Skip': -1, 'Take': 0 ,'PageNum': 0 })
        })
      ).subscribe(response => {
        if (response.RData) {
          const compressed = pako.deflate(response.RData);
          const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
          this.items = restored;
          console.log(this.items);
        }
      })
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 5000);
  }

  onIonInfinite(ev: any) {
    // this.generateItems();


    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

}
