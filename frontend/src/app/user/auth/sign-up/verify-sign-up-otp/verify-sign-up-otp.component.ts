import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router'

import { environment } from 'src/environments/environment';
import { OTP_Service } from '../../otp/otp.service';

@Component({
  selector: 'app-verify-sign-up-otp',
  templateUrl: './verify-sign-up-otp.component.html',
  styleUrls: ['./verify-sign-up-otp.component.scss'],
})
export class VerifySignUpOtpComponent {
  OTP_Form!: FormGroup;
  otpInvalid: boolean = false;
  verified: boolean = false;
  hide: boolean = true;
  verifying: boolean = false;
  isResendEnabled: boolean = false;
  otpResent: boolean = false;
  timer: any;
  timerValue: number = 5;
  logo = environment

  constructor(
    private fb: FormBuilder,
    private otpService: OTP_Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.OTP_Form = this.fb.group({
      OTP: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
    this.startTimer();
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

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  onSubmit() {
    this.verifying = true;
    const { OTP } = this.OTP_Form.value;
    this.otpService.verificationOTP(OTP).subscribe({
      next: (response) => {
        this.verifying = false;
        if (response.otpVerified) {
          this.verified = true;
        } else if (response.invalidOtp) {
          this.otpInvalid = true;
        }
      },
      error: (errorResponse) => {
        if (errorResponse.status === 401) {
          this.otpInvalid = true;
        }
      },
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

  resendOtp() {
    this.otpService.resendOtp().subscribe({
      error: (response) => {
        if (response.otpSent) {
          this.otpResent = true;
          this.resetOtpResent();
          this.timerValue = 3;
          this.startTimer();
          this.isResendEnabled = false;
        }
      },
    });
  }

  resetOtpResent() {
    setTimeout(() => {
      this.otpResent = false;
    }, 3000);
  }
}
