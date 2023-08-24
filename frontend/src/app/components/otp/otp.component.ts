import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms'

import { OTP_Service } from './otp.service';
import { SignUpDataService } from 'src/app/services/signup-data.service'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  OTP_Form!: FormGroup;
  otpInvalid: boolean = false
  verified: boolean = false

  constructor(
    private fb: FormBuilder,
    private otpService: OTP_Service,
    private signUpDataService: SignUpDataService
  ) {}

  ngOnInit(): void {
    this.OTP_Form = this.fb.group(
      {
        OTP: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      }
    );
  }

  onInput() {
    this.otpInvalid = false
  }

  onSubmit() {
    const { OTP } = this.OTP_Form.value

    const userData = this.signUpDataService.getSignUpData()

    this.otpService.verifyOTP(OTP, userData).subscribe(
      (response) => {
        this.verified = true
      },
      (errorResponse) => {
        if(errorResponse.status === 401) {
          this.otpInvalid = true
        }
      }
    )
  }

 

}
