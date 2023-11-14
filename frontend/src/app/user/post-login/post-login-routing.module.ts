import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { SearchComponent } from './search/search.component'
import { FriendsComponent } from './friends/friends.component'
import { NotificationsComponent } from './notifications/notifications.component'
const routes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    redirectTo: 'user/:id/posts'
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user/:id',
    component: FriendsComponent,
    loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule)
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }