import { NgModule } from '@angular/core'
import { TimeagoModule } from 'ngx-timeago'
import { RouterModule } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { AsyncPipe, CommonModule, NgFor } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { HomeModule } from './home/home.module'
import { NavComponent } from './nav/nav.component'
import { PostComponent } from './post/post.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { SearchComponent } from './search/search.component'
import { PostLoginComponent } from './post-login.component'
import { TopNavComponent } from './top-nav/top-nav.component'
import { SideNavComponent } from './side-nav/side-nav.component'
import { MessagesComponent } from './messages/messages.component'
import { PostLoginRoutingModule } from './post-login-routing.module'
import { RightAreaComponent } from './right-area/right-area.component'
import { UserProfileModule } from './user-profile/user-profile.module'
import { NotificationsComponent } from './notifications/notifications.component'
import { MatchInfoComponent } from './right-area/match-info/match-info.component'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    NavComponent,
    PostComponent,
    SearchComponent,
    TopNavComponent,
    SideNavComponent,
    MessagesComponent,
    RightAreaComponent,
    MatchInfoComponent,
    PostLoginComponent,
    NotificationsComponent,
  ],
  imports: [
    NgFor,
    AsyncPipe,
    HomeModule,
    FormsModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    UserProfileModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    MatAutocompleteModule,
    PostLoginRoutingModule, // routing
    TimeagoModule.forRoot(),
    MatProgressSpinnerModule,
  ],
  exports: [
    NavComponent,
    SideNavComponent,
    RightAreaComponent,
  ]
})
export class PostLoginModule { }
