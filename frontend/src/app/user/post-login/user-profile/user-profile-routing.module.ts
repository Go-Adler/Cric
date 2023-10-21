import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component'
import { PostComponent } from '../home/post/post.component'
import { SavedComponent } from './saved/saved.component'

const routes: Routes = [
  {
    path: 'friends',
    pathMatch: 'full',
    redirectTo: '/profile/friends'
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo:'posts'
  },
  {
    path: 'posts',
    component: PostComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'saved',
    component: SavedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
