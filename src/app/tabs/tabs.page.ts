import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ICurrentUser } from '../shared/models/models';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  currentUser$: Observable<ICurrentUser> = this.authenticationService.getAuthState$ as Observable<ICurrentUser>;

  subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back(){
    this.navCtrl.pop();
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  } 

}
