import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-action',
  templateUrl: './single-action.page.html',
  styleUrls: ['./single-action.page.scss'],
})
export class SingleActionPage implements OnInit, OnDestroy {

  hasActionStarted = false;

  alertButtons = [
    {
      text: 'بله',
      role: 'confirm',
      handler: () => {
        this.hasActionStarted = true;
      },
    },
    {
      text: 'خیر',
      role: 'cancel'
    }
  ];

  subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
  ) { }

  ngOnInit() {
    // this.subscription.add(
    //   this.activatedRoute.paramMap.subscribe(params => {
    //     console.log(params.get('actionId')); 
    //   })
    // );
  }
  
  ionViewWillEnter() {
    const deviceId = +(this.activatedRoute.snapshot.paramMap.get('actionId') || 'null');
    if (isNaN(deviceId)) {
        this.navController.navigateRoot('/tabs/home');
        return;
    }
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  } 

}
