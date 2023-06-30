import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as pako from 'pako';
import { EMPTY, Subscription, mergeMap, of, take } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { AuthenticationService } from '../shared/services/authentication.service';

enum FROMSTATE {
  REFRESHER = 1,
  INFINITESCROLL = 2,
}

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsPage implements OnInit, OnDestroy {

  @ViewChild('refresher') refresher!: HTMLIonRefresherElement;
  @ViewChild('infiniteScroll') infiniteSctoll!: HTMLIonInfiniteScrollElement;

  items: any[] | null = null;

  showToastError = false;
  toastMessage = '';

  PageNum = 1;
  totalPages = 1;

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

  getActions(state: FROMSTATE | null = null){
   // @ts-ignore:
   const [today, monthAgo]: [string, string] = [new Date().nanoFormat(), new Date().daysAgo(31).nanoFormat()];

   this.subscription.add(
     this.authenticationService.getAuthState$.pipe(
       take(1),
       mergeMap(authState => {
         return this.apiService.getReadyDevices({ 'ServicerID': authState!.Key, 'AzDateCTI': '2023-01-01', 'TaDateCTI': '2023-06-30', 'Skip': -1, 'PageNum': this.PageNum }).pipe(
          mergeMap((response) => {
            let restored: any[] = [];
            if (response) {
              if (response.RData) {
                const compressed = pako.deflate(response.RData);
                restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
                if (state === FROMSTATE.REFRESHER) {
                  this.items = restored;
                } else {
                  this.items = (this.items) ? this.items.concat(restored) : restored;
                }
                this.totalPages = response.totalPages;
              } else {
                this.items = [];
              }
            } else {
              this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
              this.showToastError = true;
            }
            if (state === FROMSTATE.REFRESHER) {
              this.refresher.complete()
            } else if (state === FROMSTATE.INFINITESCROLL) {
              this.infiniteSctoll.complete();
            }
            if (restored.length) {
              return this.apiService.postViewdPlans({ 'ServicerID': authState!.Key, 'json_IDRList': JSON.stringify(restored.map(x => ({ 'idrRid': x.idrRid }))) });
            } 
            return EMPTY;
           })
          )
       })
     ).subscribe()
   );
  }

  handleRefresh() {
    this.PageNum = 1;
    this.getActions(FROMSTATE.REFRESHER);
  }

  onIonInfinite() {
    if (this.totalPages > this.PageNum) {
      this.PageNum = this.PageNum + 1;
      this.getActions(FROMSTATE.INFINITESCROLL);
    } else {
      this.infiniteSctoll.complete();
    }
  }

  actionActived(item: any) {
   console.log(item);
   this.toastMessage = 'نصب این دستگاه به شما واگذار شد.';
   this.showToastError = true;
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

}
