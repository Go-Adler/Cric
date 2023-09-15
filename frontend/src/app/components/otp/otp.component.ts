import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { OTP_Service } from './otp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  OTP_Form!: FormGroup;
  otpInvalid: boolean = false;
  verified: boolean = false;
  hide: boolean = true;
  confirmHide: boolean = true;
  resetPassword: boolean = false;
  isSigningUp: boolean = false;
  passwordChanged: boolean = false;
  timerValue: number = 3;
  timer: any;
  isResendEnabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private otpService: OTP_Service,
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

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer()
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
    this.otpService.verificationOTP(OTP).subscribe(
      (response) => {
        if (response.otpVerified) {
          this.resetPassword = true;
        } else if (response.invalidOtp) {
          this.otpInvalid = true
        }
      },
    );
  }

  submitPassword() {
    this.isSigningUp = true;
    const { password } = this.signUpForm.value;
    this.otpService.changePassword(password).subscribe((response) => {
      if (response.changePassword) {
        this.resetPassword = false;
        this.passwordChanged = true;
        localStorage.removeItem('verifyToken')
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timerValue > 0) {
        this.timerValue--; 
      } else {
        this.stopTimer();
        this.isResendEnabled = true; 
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer); // Stop the timer
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  resendOtp() {
    console.log('click');
    
    this.otpService.resendOtp()
  }
  
}
