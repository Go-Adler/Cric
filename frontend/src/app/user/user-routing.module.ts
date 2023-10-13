import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component'
import { PostLoginComponent } from './post-login/post-login.component'
import { LogInGuard } from '../guards/logIn.guard'
import { AuthGuard } from '../guards/auth.guard'

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '/user/auth/log-in'
  // },
  // {
  //   path: '',
  //   component: PostLoginComponent,
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./post-login/post-login.module').then(m => m.PostLoginModule)
  // },
  // {
  //   path: 'auth',
  //   component: UserComponent,
  //   canActivate: [LogInGuard],
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
