import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot.password.service'
import { environment } from 'src/environments/environment';


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
  logo = environment.CRIC_LOGO


  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    });
  }

  onSubmit() {
    this.isLogging = true;
    this.errorMessage = '';
    const { email } = this.logInForm.value;

    this.forgotPasswordService.forgotPassword(email).subscribe(
      {
        next:(response) => {
          this.isLogging = false;
          if (response.userNotExisting) {
            this.errorMessage = 'User not existing';
          } else {
            this.router.navigate(['/auth/verify-otp']);
          }
        }
      }
    );
  }
}
