import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { OTP_Service } from 'src/app/components/otp/otp.service';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private otpService: OTP_Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.OTP_Form = this.fb.group({
      OTP: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
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
          this.verified = true
        } else if (response.invalidOtp) {
          this.otpInvalid = true
        }
      },
      (errorResponse) => {
        if (errorResponse.status === 401) {
          this.otpInvalid = true;
        }
      }
    );
  }
}