import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { SignUpComponent} from './components/sign-up/sign-up.component'
import { OtpComponent } from './components/otp/otp.component'
import { LogInComponent } from './components/log-in/log-in.component'
import { ErrorComponent } from './components/error/error.component'
import { authGuard } from './guards/auth.guard'

const routes: Routes = [
  { 
    path: 'user/home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { path: 'user/sign-up', component: SignUpComponent },
  { path: 'user/sign-up-otp', component: OtpComponent},
  { path: 'user/log-in', component: LogInComponent},
  { path: 'user/error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
