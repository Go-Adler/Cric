import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { loginService } from './log-in.service'
import { NotificationService } from '../../post-login/post-login.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;
  hide: boolean = true;
  errorMessage: string = '';
  wrongPassword: string = '';
  isLogging: boolean = false;
  logo = environment.CRIC_LOGO

  constructor(
    private fb: FormBuilder,
    private logInService: loginService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*])[a-zA-Z0-9!-@#$%^&*]{8,20}$'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.logInForm.valid) {
      this.isLogging = true;
      this.errorMessage = '';
      this.wrongPassword = '';
      const { email, password } = this.logInForm.value;
  
      this.logInService.login(email, password).subscribe(
        {
          next:(response) => {
            this.isLogging = false;
            if (response.token) {
              const token = response.token;
              localStorage.setItem('token', token);
            }
            if (response.userNotExisting) {
              this.errorMessage = 'User not existing';
            } else if (response.wrongPassword) {
              this.wrongPassword = 'Wrong password';
            } else if (response.notVerified) {
              this.router.navigate(['/auth/sign-up-otp']);
            } else {
              this.userService.getUserBasicInfo()
              this.authService.setLoginStatus(true);
              this.router.navigate(['/home']);
            }
          }
        }
      );
    }
  }
}