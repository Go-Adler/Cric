import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router'
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component'
import { NavComponent } from './nav/nav.component'
import { RightAreaComponent } from './right-area/right-area.component'
import { TopNavComponent } from './top-nav/top-nav.component'
import { MatchInfoComponent } from './right-area/match-info/match-info.component'
import { PostLoginComponent } from './post-login.component'
import { UserProfileModule } from './user-profile/user-profile.module'
import { HomeModule } from './home/home.module';
import { SearchComponent } from './search/search.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { FriendsComponent } from './friends/friends.component'

@NgModule({
  declarations: [
    SideNavComponent,
    NavComponent,
    RightAreaComponent,
    TopNavComponent,
    MatchInfoComponent,
    PostLoginComponent,
    SearchComponent,
    FriendsComponent,
  ],
  imports: [
    HomeModule,
    RouterModule,
    CommonModule,
    UserProfileModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    PostLoginRoutingModule,
  ]
})
export class PostLoginModule { }
