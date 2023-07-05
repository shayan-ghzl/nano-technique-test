import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ICurrentUser } from '../shared/models/models';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @Output() tabPressed = new EventEmitter<'next' | 'prev'>();

  currentUser$: Observable<ICurrentUser> = this.authenticationService.getAuthState$ as Observable<ICurrentUser>;
  
  /*
    1: tab one
    2: tab two
    3: tab three
    4: means we are not it score page
  */
  nextTabStatus = 4;
  
  subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

  }

  back(){
    if (this.nextTabStatus == 4 || this.nextTabStatus == 1) {
      this.navCtrl.pop();
    } else {
      this.tabPressed.emit('prev');
    }
  }

  scoreNextSegment(){
    if (this.nextTabStatus < 3) {
      this.tabPressed.emit('next');
    }
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  } 

}
