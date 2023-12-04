import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { UserPostComponent } from './user-post/user-post.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { TimeagoModule } from 'ngx-timeago'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { HomeModule } from '../home/home.module'
import { MatButtonModule } from '@angular/material/button'
import { FriendsComponent } from './friends.component'


@NgModule({
  declarations: [
    UserPostComponent,
    FriendsComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    TimeagoModule.forRoot(),
    LazyLoadImageModule,
    FriendsRoutingModule,
  ]
})
export class FriendsModule { }
