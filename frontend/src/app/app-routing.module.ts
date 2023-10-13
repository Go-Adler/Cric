import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { AppComponent } from './app.component'
import { OtpComponent } from './user/auth/otp/otp.component'
import { HomeComponent } from './user/post-login/home/home.component'

const routes: Routes = [
  {
    path: 'user',
    component: OtpComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/ss'
  },
  {
    path: 'ss',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
