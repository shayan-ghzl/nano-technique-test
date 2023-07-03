import { Component, OnInit, ViewChild } from '@angular/core';
import * as pako from 'pako';
import { Subscription, tap } from 'rxjs';
import { IDevice } from '../shared/models/models';
import { ApiService } from '../shared/services/api.service';
import { AuthenticationService } from '../shared/services/authentication.service';

enum FROMSTATE {
  REFRESHER = 1,
  INFINITESCROLL = 2,
}

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.page.html',
  styleUrls: ['./monthly-report.page.scss'],
})
export class MonthlyReportPage implements OnInit {

  @ViewChild('refresher') refresher!: HTMLIonRefresherElement;
  @ViewChild('infiniteScroll') infiniteSctoll!: HTMLIonInfiniteScrollElement;

  items: IDevice[] | null = null;
  showToastError = false;
  PageNum = 1;
  totalPages = 1;

  subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getReports();
  }

  getReports(state: FROMSTATE | null = null){
    // @ts-ignore:
    const [today, monthAgo]: [string, string] = [new Date().nanoFormat(), new Date().daysAgo(31).nanoFormat()];

    this.subscription.add(
      this.apiService.getinstalledDevices({ 'ServicerID': this.authenticationService.servicerId, 'AzDateCTI': '2023-01-01', 'TaDateCTI': '2023-06-30', 'Skip': -1, 'PageNum': this.PageNum }).pipe(
        tap((response) => {
          console.log(response);
          if (response) {
            if (response.RData) {
              const compressed = pako.deflate(response.RData);
              const restored: IDevice[] = JSON.parse(pako.inflate(compressed, { to: 'string' }));
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
            this.showToastError = true;
          }
          if (state === FROMSTATE.REFRESHER) {
            this.refresher.complete()
          } else if (state === FROMSTATE.INFINITESCROLL) {
            this.infiniteSctoll.complete();
          }
        })
      ).subscribe()
    );
  }
  
  handleRefresh() {
    this.PageNum = 1;
    this.getReports(FROMSTATE.REFRESHER);
  }

  onIonInfinite() {
    if (this.totalPages > this.PageNum) {
      this.PageNum = this.PageNum + 1;
      this.getReports(FROMSTATE.INFINITESCROLL);
    } else {
      this.infiniteSctoll.complete();
    }
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}
