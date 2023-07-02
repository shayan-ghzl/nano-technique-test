import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  customerForm = new FormGroup({
    srName: new FormControl({ value: '', disabled: false }, { validators: [Validators.required], nonNullable: true }),
    srPass: new FormControl({ value: '', disabled: false }, { validators: [Validators.required], nonNullable: true }),
    // srName: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.pattern(/^[a-z0-9]{3,12}$/i)], nonNullable: true }),
    // srPass: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{6,12}$/)], nonNullable: true }),
  });

  showToastError = false;
  errorMessage = '';
  avoidRepetition = false;
  showSpinner = false;

  subscription = new Subscription();

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subscription.add(
      this.customerForm.valueChanges.pipe(
        tap(() => this.avoidRepetition = false),
      ).subscribe()
    );
  }

  submit(){
    if (this.customerForm.invalid) {
      return;
    }
    this.customerForm.disable({emitEvent: false});
    this.avoidRepetition = true;
    this.showSpinner = true;
    setTimeout(() => {
      this.errorMessage = 'نام کاربری یا کلمه عبور صحیح نیست.';
      this.showToastError = true;
      this.customerForm.enable({emitEvent: false});
      this.showSpinner = false;
      this.navController.navigateRoot('/tabs/home');
    }, 2000);
  }

  ngOnDestroy(): void {
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}
