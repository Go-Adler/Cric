import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component'
import { NavComponent } from './nav/nav.component'
import { RightAreaComponent } from './right-area/right-area.component'
import { TopNavComponent } from './top-nav/top-nav.component'
import { MatchInfoComponent } from './right-area/match-info/match-info.component'
import { PostLoginComponent } from './post-login.component'
import { UserProfileModule } from './user-profile/user-profile.module'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    SideNavComponent,
    NavComponent,
    RightAreaComponent,
    TopNavComponent,
    MatchInfoComponent,
    PostLoginComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    PostLoginRoutingModule,
    UserProfileModule,
  ]
})
export class PostLoginModule { }