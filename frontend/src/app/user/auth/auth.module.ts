import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LogInComponent } from './log-in/log-in.component';
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifySignUpOtpComponent } from './sign-up/verify-sign-up-otp/verify-sign-up-otp.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { OtpComponent } from './otp/otp.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import {MatProgressBarModule} from '@angular/material/progress-bar'

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
    AuthComponent,
    OtpComponent,
    ForgotPasswordComponent,
    VerifySignUpOtpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    AuthRoutingModule,
    MatProgressBarModule,
  ],
})
export class AuthModule {}
