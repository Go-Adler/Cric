import { NgModule } from '@angular/core';
import { TimeagoModule } from 'ngx-timeago'
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { HomeModule } from '../home/home.module'
import { FriendsComponent } from './friends.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { FriendsRoutingModule } from './friends-routing.module';
import { UserPostComponent } from './user-post/user-post.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'


@NgModule({
  declarations: [
    FriendsComponent,
    UserPostComponent,
  ],
  imports: [
    HomeModule,
    CommonModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    LazyLoadImageModule,
    MatProgressBarModule,
    FriendsRoutingModule, // routing
    TimeagoModule.forRoot(),
    MatProgressSpinnerModule,
  ]
})
export class FriendsModule { }
