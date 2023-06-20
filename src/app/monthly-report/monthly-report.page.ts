import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, switchMap, take, tap } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ApiService } from '../shared/services/api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import * as pako from 'pako';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.page.html',
  styleUrls: ['./monthly-report.page.scss'],
})
export class MonthlyReportPage implements OnInit {

  @ViewChild('refresher') refresher!: HTMLIonRefresherElement;

  items: any[] | null = null;
  showToastError = false;

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

  getReports(fromRefresher: boolean = false){
    // @ts-ignore:
    const [today, monthAgo]: [string, string] = [new Date().nanoFormat(), new Date().daysAgo(31).nanoFormat()];

    this.subscription.add(
      this.authenticationService.getAuthState$.pipe(
        switchMap(authState => {
          return this.apiService.getinstalledDevices({ 'ServicerID': authState!.Key, 'AzDateCTI': '2023-01-01', 'TaDateCTI': '2023-06-30', 'Skip': -1 })
        })
      ).pipe(
        take(1),
        tap(response => {
          if (response) {
            if (response.RData) {
              const compressed = pako.deflate(response.RData);
              const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
              this.items = restored;
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
    this.getReports(true);
  }

  onIonInfinite(ev: any) {
    this.getReports();
    
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}
