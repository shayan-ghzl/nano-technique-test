import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-action',
  templateUrl: './single-action.page.html',
  styleUrls: ['./single-action.page.scss'],
})
export class SingleActionPage implements OnInit, OnDestroy {

  alertButtons = [
    {
      text: 'بله',
      role: 'confirm',
      handler: () => {
        return Promise.resolve(true);
      },
    },
    {
      text: 'خیر',
      role: 'cancel',
      handler: () => {
        return Promise.resolve(true);
      },
    }
  ];

  subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('actionId'); // get the ID parameter from the URL
        console.log(id); // log the ID value to the console
      })
    );
    // or
    console.log(this.activatedRoute.snapshot.paramMap.get('actionId'));
    // -----------------
    // using state
    // this.subscription.add(
    //   this.activatedRoute.data.subscribe(params => {
    //     this.product = params['product'].data;
    //     console.log(this.product);
    //   })
    // );
    // or
    // this.activatedRoute.paramMap.pipe(
    //   map(() => window.history.state),
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
