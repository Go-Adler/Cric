import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from '../home/post/post.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo:'posts'
  },
  {
    path: 'posts',
    component: PostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }