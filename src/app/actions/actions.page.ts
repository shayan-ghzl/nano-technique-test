import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
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
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.items = [
        {
            "idrRid": 1,
            "idpId": 40,
            "idrDateOfService": "2023/06/05",
            "idrTimeOfService": "10:30:00",
            "idrClientName": "Test"
        },
        {
            "idrRid": 2,
            "idpId": 41,
            "idrDateOfService": "2023/06/06",
            "idrTimeOfService": "10:00:00",
            "idrClientName": "Test Test"
        }
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

  actionActived(item: any) {
   this.toastMessage = 'نصب این دستگاه به شما واگذار شد.';
   this.showToastError = true;
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

}
