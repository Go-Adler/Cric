import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OtpComponent } from './components/otp/otp.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ErrorComponent } from './components/error/error.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsersComponent } from './components/users/users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PostComponent } from './components/post/post.component';
import { LogInGuard } from './guards/logIn.guard';
import { AuthGuard } from './guards/auth.guard';
import { SportsComponent } from './components/sports/sports.component'
import { VerifySignUpOtpComponent } from './components/sign-up/verify-sign-up-otp/verify-sign-up-otp.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/log-in',
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'user/home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  { path: 'user/post/:id', component: PostComponent, canActivate: [AuthGuard] },

  { path: 'user/forgot-password', component: ForgotPasswordComponent },
  {
    path: 'user/log-in',
    component: LogInComponent,
    canActivate: [LogInGuard],
  },
  { path: 'user/error', component: ErrorComponent },

  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'user/sports',
    component: SportsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'user/sign-up',
    component: SignUpComponent,
    canActivate: [LogInGuard],
  },

  {
    path: 'user/sign-up-otp',
    component: VerifySignUpOtpComponent,
    canActivate: [LogInGuard],
  },

  {
    path: 'user/verify-otp',
    component: OtpComponent,
    canActivate: [LogInGuard],
  },

  //Admin
  { path: 'admin/users', component: UsersComponent },

  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/log-in', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
