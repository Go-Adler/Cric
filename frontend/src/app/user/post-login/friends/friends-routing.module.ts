import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPostComponent } from './user-post/user-post.component'
import { PostComponent } from '../post/post.component';

const routes: Routes = [
  {
    path: 'posts',
    component: UserPostComponent,
    pathMatch: 'full'
  },
  {
    path: ':id', 
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
