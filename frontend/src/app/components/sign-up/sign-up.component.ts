import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';

import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  hide: boolean = true;
  confirmHide: boolean = true;
  errorMessage!: string
  isSigningUp: boolean = false

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern("^[A-Za-z' -]+$")]],
        userName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        gender: ['', Validators.required],
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
    this.isSigningUp = true
    this.errorMessage = ''
    
    const formData = { ...this.signUpForm.value };
    delete formData.confirmPassword;


    this.signUpService.signUp(formData).subscribe(
      (response) => {
        this.isSigningUp = false
        if (response.error) {
          this.errorMessage = response.error
        } else {
          this.router.navigate(['/user/sign-up-otp'])
        }
      },
      (error) => {
        this.errorMessage = error.error.message
      }
    );
  }
}
