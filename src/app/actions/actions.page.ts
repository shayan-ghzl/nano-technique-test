import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Subscription, switchMap, take, tap } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import * as pako from 'pako';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit, OnDestroy {

  @ViewChild('refresher') refresher!: HTMLIonRefresherElement;

  items: any[] | null = null;
  showToastError = false;

  subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getActions();
  }

  getActions(fromRefresher: boolean = false){
   // @ts-ignore:
   const [today, monthAgo]: [string, string] = [new Date().nanoFormat(), new Date().daysAgo(31).nanoFormat()];

   this.subscription.add(
     this.authenticationService.getAuthState$.pipe(
       switchMap(authState => {
         return this.apiService.getReadyDevices({ 'ServicerID': authState!.Key, 'AzDateCTI': '2023-01-01', 'TaDateCTI': '2023-06-30', 'Skip': -1 })
       })
     ).pipe(
       take(1),
       tap(response => {
         if (response) {
           if (response.RData) {
             const compressed = pako.deflate(response.RData);
             const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
             this.items = restored;
             console.log(this.items);
             
           } else {
             this.items = [];
           }
         } else {
           this.showToastError = true;
         }
       })
     ).subscribe({
      complete: () => {
        if (fromRefresher) {
          this.refresher.complete()
        }
      },
     })
   );
  }

  handleRefresh() {
    this.getActions(true);
  }

  onIonInfinite(ev: any) {
    this.getActions();
    
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

}
