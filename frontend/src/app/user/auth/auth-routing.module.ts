import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { OtpComponent } from './otp/otp.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { VerifySignUpOtpComponent } from './sign-up/verify-sign-up-otp/verify-sign-up-otp.component'

const routes: Routes = [
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'sign-up-otp',
    component: VerifySignUpOtpComponent
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
    component: OtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
