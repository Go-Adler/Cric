import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginComponent } from './post-login.component'
const routes: Routes = [
  {
    path: 'home',
    component: PostLoginComponent,
    loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }