import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { OTP_Service } from './otp.service';

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
  isChangingPassword: boolean = false;
  passwordChanged: boolean = false;
  timerValue: number = 5;
  timer: any;
  isResendEnabled: boolean = false;
  otpResent: boolean = false
  otpVerifying = false
  continueToLogin = false
  logo = environment.CRIC_LOGO

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
    this.otpVerifying = true
    const { OTP } = this.OTP_Form.value;
    this.otpService.verificationOTP(OTP).subscribe(
      {
        next: (response) => {
          this.otpVerifying = false
          if (response.otpVerified) {
            this.resetPassword = true;
          } else if (response.invalidOtp) {
            this.otpInvalid = true
          }
        },
      }
    );
  }

  submitPassword() {
    this.isChangingPassword = true;
    const { password } = this.signUpForm.value;
    this.otpService.changePassword(password).subscribe({
      next: (response) => {
        this.isChangingPassword = false
        if (response.changePassword) {
          this.resetPassword = false;
          this.passwordChanged = true;
          localStorage.removeItem('verifyToken')
        }
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
    this.otpService.resendOtp().subscribe({
      next: (response) => {
        if (response.otpSent) {
          this.otpResent = true
          this.resetOtpResent()
          this.timerValue = 3
          this.startTimer();
          this.isResendEnabled = false
        }
        
      }
    })
  }

  resetOtpResent() {
    setTimeout(() => {
      this.otpResent = false
    }, (3000));
  }
  
}
