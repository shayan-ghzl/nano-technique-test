import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(
    private navController: NavController,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.navController.navigateRoot('/login');
    }, 3000);
  }

}
