import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { loginService } from './log-in.service'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;
  hide: boolean = true;
  errorMessage:string = ''
  isLogging: boolean = false

  constructor(
    private fb: FormBuilder,
    private logInService: loginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.isLogging = true
    this.errorMessage = ''
    const { email, password } = this.logInForm.value
    
    this.logInService.login(email, password).subscribe(
      (response) => {
        this.isLogging = false
        console.log(response, 42);
        
        if (response.userNotExisting) {
            this.errorMessage = 'User not existing'
        } else {
          const token = response.token;
          localStorage.setItem('token', token)
          console.log(token, 44);
          
          this.router.navigate(['/user/home'])
        }
       
      },
      (errorResponse) => {
        console.log(errorResponse);
        
      }
    )
  }
}
