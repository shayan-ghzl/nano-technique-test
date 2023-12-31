import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonInput } from '@ionic/angular';
import { Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  @ViewChild('autoFocus') usernameInput!: IonInput;

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
    private authenticationService: AuthenticationService,
  ) { }

  ionViewDidEnter(): void {
    this.usernameInput.setFocus();
    Keyboard.show()
      .catch((error) => {
        console.log('Keyboard plugin is not implemented on web');
      });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subscription.add(
      this.customerForm.valueChanges.pipe(
        tap(() => this.avoidRepetition = false),
      ).subscribe()
    );
  }

  submit() {
    if (this.customerForm.invalid) {
      return;
    }
    this.customerForm.disable({ emitEvent: false });
    this.avoidRepetition = true;
    this.showSpinner = true;
    this.subscription.add(
      this.authenticationService.login(this.customerForm.value as { srName: string, srPass: string; }).pipe(
        tap(response => {

          if (!response.customStatus) {
            // Bad Request: means client has sent wrong parameter(s)
            if (response.status == 400) {
              console.log(response);
              this.errorMessage = 'نام کاربری یا کلمه عبور صحیح نیست.';
            } else {
              this.errorMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
              this.avoidRepetition = false;
            }
            this.showSpinner = false;
            this.showToastError = true;
            this.customerForm.enable({ emitEvent: false });
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
