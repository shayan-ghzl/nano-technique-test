import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  customerForm = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9]{3,12}$/i)]),
    password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{6,12}$/)]),
  });

  constructor() { }

  ngOnInit() {
  }

  submit(){
    if (this.customerForm.invalid) {
      return;
    }

  }
}
