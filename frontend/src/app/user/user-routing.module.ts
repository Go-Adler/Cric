import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component'
import { PostLoginComponent } from './post-login/post-login.component'

const routes: Routes = [
  {
    path: '',
    component: PostLoginComponent,
    loadChildren: () => import('./post-login/post-login.module').then(m => m.PostLoginModule)
  },
  {
    path: 'auth',
    component: UserComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
