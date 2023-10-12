import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot.password.service'


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  logInForm!: FormGroup;
  hide: boolean = true;
  errorMessage: string = '';
  isLogging: boolean = false;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.isLogging = true;
    this.errorMessage = '';
    const { email } = this.logInForm.value;

    this.forgotPasswordService.forgotPassword(email).subscribe(
      (response) => {
        this.isLogging = false;
        if (response.userNotExisting) {
          this.errorMessage = 'User not existing';
        } else {
          this.router.navigate(['user/verify-otp']);
        }
      },
      (errorResponse) => {
      }
    );
  }
}
