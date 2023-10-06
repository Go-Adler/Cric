import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/auth',
    pathMatch:'full'
  },
  {
    path: 'auth',
    component: UserComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
