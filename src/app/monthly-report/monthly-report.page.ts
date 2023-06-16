import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.page.html',
  styleUrls: ['./monthly-report.page.scss'],
})
export class MonthlyReportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 5000);
  }

}
