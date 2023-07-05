import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as pako from 'pako';
import { EMPTY, Subscription, mergeMap, tap } from 'rxjs';
import { IDevice } from '../shared/models/models';
import { ApiService } from '../shared/services/api.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { TabsPage } from '../tabs/tabs.page';

enum FROMSTATE {
  REFRESHER = 1,
  INFINITESCROLL = 2,
}

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit, OnDestroy {

  @ViewChild('refresher') refresher!: HTMLIonRefresherElement;
  @ViewChild('infiniteScroll') infiniteSctoll!: HTMLIonInfiniteScrollElement;

  items: IDevice[] | null = null;

  showToastError = false;
  toastMessage = '';

  assignedItem = false;
  PageNum = 1;
  totalPages = 1;

  servicerID = this.authenticationService.servicerId;

  subscription = new Subscription();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.assignedItem = this.router.url.includes('today');
    this.getActions();
  }

  getActions(state: FROMSTATE | null = null){
    // @ts-ignore:
    const [today, monthAgo]: [string, string] = [new Date().nanoFormat(), new Date().daysAgo(31).nanoFormat()];
   
    this.subscription.add(
      this.apiService.getReadyDevices({ 'ServicerID': this.servicerID, 'AzDateCTI': '2023-01-01', 'TaDateCTI': '2023-06-30', 'Skip': -1, 'PageNum': this.PageNum, 'AcceptedKind': this.assignedItem ? 'A' : 'N' }).pipe(
        mergeMap((response) => {
          let restored: IDevice[] = [];
          if (response) {
            if (response.RData) {
              const compressed = pako.deflate(response.RData);
              restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
              if (state === FROMSTATE.REFRESHER) {
                this.items = restored;
              } else {
                this.items = (this.items) ? this.items.concat(restored) : restored;
              }
              this.totalPages = response.TotalPages;
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
            return this.apiService.postViewdPlans({ 'ServicerID': this.servicerID, 'json_IDRList': JSON.stringify(restored.map(x => ({ 'idrRid': x.idrRid }))) });
          } 
          return EMPTY;
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

  actionActived(event: any, item: any) {
    const toggle = event.target as HTMLIonToggleElement;
    toggle.disabled = true;
    this.subscription.add(
      this.apiService.postAcceptPlanToInstall({
        "servicerID": this.servicerID,
        "json_IDRList": JSON.stringify([{ idrRid: item.idrRid }])
      }).pipe(
        tap(response => {
          if (response) {
            this.toastMessage = 'نصب این دستگاه به شما واگذار شد.';
          } else {
            this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
            item.disabled = false;
            toggle.checked = !toggle.checked;
          }
          this.showToastError = true;
        })
      ).subscribe()
   );
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

}
