import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component'
import { UpdateProfilePictureComponent } from './update-profile-picture/update-profile-picture.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { ImageCropperModule } from 'ngx-image-cropper'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SavedComponent } from './saved/saved.component'
import { FriendsComponent } from './friends/friends.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TimeagoModule } from 'ngx-timeago'
import { HomeModule } from '../home/home.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [
    SavedComponent,
    FriendsComponent,
    UserProfileComponent,
    UpdateProfilePictureComponent,
  ],
  imports: [
    HomeModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ImageCropperModule,
    LazyLoadImageModule,
    MatProgressBarModule,
    TimeagoModule.forRoot(),
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    UserProfileRoutingModule, // routing
  ]
})
export class UserProfileModule { }
