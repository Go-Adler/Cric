import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { SearchComponent } from './search/search.component'
import { FriendsComponent } from './friends/friends.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { MessagesComponent } from './messages/messages.component'
import { SettingsComponent } from './settings/settings.component'
const routes: Routes = [
  {
    path: 'user/:id',
    pathMatch: 'full',
    redirectTo: 'user/:id/posts'
  },
  {
    path: 'profile',
    pathMatch: 'full',
    redirectTo:'profile/posts'
  },
  {
    path: 'profile',
    pathMatch: 'prefix',
    component: UserProfileComponent,
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user/:user-name',
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
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }