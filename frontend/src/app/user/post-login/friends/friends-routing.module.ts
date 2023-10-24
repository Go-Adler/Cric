import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPostComponent } from './user-post/user-post.component'

const routes: Routes = [
  {
    path: 'posts',
    component: UserPostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
