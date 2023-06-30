import { Component, OnInit, ViewChild } from '@angular/core';
import * as pako from 'pako';
import { Subscription, switchMap, take, tap } from 'rxjs';
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyReportPage implements OnInit {

  @ViewChild('refresher') refresher!: HTMLIonRefresherElement;
  @ViewChild('infiniteScroll') infiniteSctoll!: HTMLIonInfiniteScrollElement;

  items: any[] | null = null;
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
      this.authenticationService.getAuthState$.pipe(
        switchMap(authState => {
          return this.apiService.getinstalledDevices({ 'ServicerID': authState!.Key, 'AzDateCTI': '2023-01-01', 'TaDateCTI': '2023-06-30', 'Skip': -1, 'PageNum': this.PageNum })
        })
      ).pipe(
        take(1),
        tap(response => {
          if (response) {
            if (response.RData) {
              const compressed = pako.deflate(response.RData);
              const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
              this.items = restored;
              this.totalPages = response.totalPages;
            } else {
              this.items = [];
            }
          } else {
            this.showToastError = true;
          }
        })
      ).subscribe({
        complete: () => {
          if (state === FROMSTATE.REFRESHER) {
            this.refresher.complete()
          } else if (state === FROMSTATE.INFINITESCROLL) {
            this.infiniteSctoll.complete();
          }
        },
       })
    );
  }

  handleRefresh() {
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
