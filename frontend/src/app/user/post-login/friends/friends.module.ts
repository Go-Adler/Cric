import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { UserPostComponent } from './user-post/user-post.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'


@NgModule({
  declarations: [
    UserPostComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    FriendsRoutingModule,
  ]
})
export class FriendsModule { }
