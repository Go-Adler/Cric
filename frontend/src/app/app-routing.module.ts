import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { SignUpComponent} from './components/sign-up/sign-up.component'
import { OtpComponent } from './components/otp/otp.component'
import { LogInComponent } from './components/log-in/log-in.component'
import { ErrorComponent } from './components/error/error.component'
import { logInGuard } from './guards/logIn.guard'
import { logOutGuard } from './guards/logOut.guard'

const routes: Routes = [
  { 
    path: 'user/home',
    component: HomeComponent,
    canActivate: [logInGuard]
  },
  { path: 'user/sign-up', component: SignUpComponent },
  { path: 'user/sign-up-otp', component: OtpComponent},
  { path: 'user/log-in', 
    component: LogInComponent,
    canActivate: [logOutGuard]
  },
  { path: 'user/error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
