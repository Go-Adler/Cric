import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

import { OTP_Service } from './otp.service';
import { SignUpDataService } from 'src/app/services/signup-data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class  OtpComponent implements OnInit {
  signUpForm!: FormGroup;
  OTP_Form!: FormGroup;
  otpInvalid: boolean = false;
  verified: boolean = false;
  hide: boolean = true
  confirmHide: boolean = true
  resetPassword: boolean = false
  isSigningUp: boolean = false
  passwordChanged: boolean = false

  constructor(
    private fb: FormBuilder,
    private otpService: OTP_Service,
    private signUpDataService: SignUpDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.OTP_Form = this.fb.group({
      OTP: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });

    this.signUpForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*])[a-zA-Z0-9!-@#$%^&*]{8,20}$'
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*])[a-zA-Z0-9!-@#$%^&*]{8,20}$'
            ),
          ],
        ],
      },
      {
        validator: this.passwordMatchValidator as ValidatorFn,
      }
    );
  }

  onInput() {
    this.otpInvalid = false;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    const { OTP } = this.OTP_Form.value;

    const email = this.signUpDataService.getSignUpData();

    this.otpService.verifyOTP(OTP, email).subscribe(
      (response) => {
        const routeParams = window.location.href
        console.log(routeParams, 86666666);
        
        if (response.otpVerified) {
          this.resetPassword = true
        } else {
          this.verified = true;
        }
      },
      (errorResponse) => {
        if (errorResponse.status === 401) {
          this.otpInvalid = true;
        }
      }
    );
  }

  submitPassword( ) {
    this.isSigningUp = true
    const { password } = this.signUpForm.value
    this.otpService.changePassword(password).subscribe(
      response => {
        if(response.changePassword) {
          this.resetPassword = false
          this.passwordChanged = true
          localStorage.clear()
        }
      }
    )
    
  }
}
