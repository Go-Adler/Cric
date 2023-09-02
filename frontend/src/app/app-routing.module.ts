import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OtpComponent } from './components/otp/otp.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ErrorComponent } from './components/error/error.component';
import { logInGuard } from './guards/logIn.guard';
import { logOutGuard } from './guards/logOut.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsersComponent } from './components/users/users.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { PostComponent } from './components/post/post.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/log-in',
    pathMatch: 'full',
  },
  {
    path: 'user/home',
    component: HomeComponent,
    canActivate: [logInGuard],
  },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [logInGuard],
  },
  { path: 'user/sign-up', component: SignUpComponent },
  { path: 'user/sign-up-otp', component: OtpComponent },
  { path: 'user/verify-otp', component: OtpComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'user/forgot-password', component: ForgotPasswordComponent },
  { path: 'user/post/:id', component: PostComponent },
  {
    path: 'user/log-in',
    component: LogInComponent,
    canActivate: [logOutGuard],
  },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/log-in', component: AdminLoginComponent },
  { path: 'user/error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
