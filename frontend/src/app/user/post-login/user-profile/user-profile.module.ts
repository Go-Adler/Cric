import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component'
import { UpdateProfilePictureComponent } from './update-profile-picture/update-profile-picture.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { ImageCropperModule } from 'ngx-image-cropper'
import { MatProgressBarModule } from '@angular/material/progress-bar'


@NgModule({
  declarations: [
    UserProfileComponent,
    UpdateProfilePictureComponent
  ],
  imports: [
    MatProgressBarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImageCropperModule,
    UserProfileRoutingModule,
  ]
})
export class UserProfileModule { }
