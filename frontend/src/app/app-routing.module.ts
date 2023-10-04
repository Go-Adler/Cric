import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { OtpComponent } from './components/otp/otp.component';
import { LogInComponent } from './components/user/auth/log-in/log-in.component';
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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'


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
    path: 'user',
    loadChildren: () => import('./components/user/auth/log-in/log-in.routes').then(routes => routes.authRoutes)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
