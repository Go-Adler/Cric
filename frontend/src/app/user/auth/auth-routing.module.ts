import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { VerifySignUpOtpComponent } from './sign-up/verify-sign-up-otp/verify-sign-up-otp.component'
import { OtpComponent } from './otp/otp.component'

const routes: Routes = [
  {
    path: 'user/auth',
    pathMatch: 'full',
    redirectTo: 'user/auth/log-in'
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'verify-otp',
    component: OtpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
