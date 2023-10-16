import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/log-in'
  },
  {
    path: '',
    pathMatch: 'prefix',
    component: UserComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
