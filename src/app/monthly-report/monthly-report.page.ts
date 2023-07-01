import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.page.html',
  styleUrls: ['./monthly-report.page.scss'],
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
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.items = [
        1,2,3,4,5,6,7,8
      ];
    }, 2000);
  }


  handleRefresh() {
    this.PageNum = 1;
  }

  onIonInfinite() {
    if (this.totalPages > this.PageNum) {
      this.PageNum = this.PageNum + 1;
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
