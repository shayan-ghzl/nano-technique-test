import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-single-action',
  templateUrl: './single-action.page.html',
  styleUrls: ['./single-action.page.scss'],
})
export class SingleActionPage implements OnInit, OnDestroy {

  hasActionStarted = false;
  assignedItem = false;

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
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
    this.assignedItem = this.router.url.includes('read-only');
    const deviceId = +(this.activatedRoute.snapshot.paramMap.get('actionId') || 'null');
    if (isNaN(deviceId)) {
        this.navController.navigateRoot('/tabs/home');
        return;
    }
    this.subscription.add(
      this.apiService.getDeviceById(deviceId).pipe(
        tap(response => {
          if (response) {
            console.log(response);
          } else {
            this.navController.navigateRoot('/tabs/home');
          }
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
