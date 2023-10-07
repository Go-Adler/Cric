import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/auth/log-in',
    pathMatch: 'full'
  },
  {
    path: 'user',
    redirectTo: 'user/auth/log-in',
    pathMatch: 'full'
  },
  {
    path: 'user/auth',
    redirectTo: 'user/auth/log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
