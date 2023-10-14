import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginComponent } from './user/post-login/post-login.component'

const routes: Routes = [
  {
    path: '',
    component: PostLoginComponent,
    loadChildren: () => import('./user/post-login/post-login.module').then(m => m.PostLoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
