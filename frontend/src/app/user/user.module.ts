import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserComponent } from './user.component'
import { PostLoginModule } from './post-login/post-login.module'

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    AuthModule,
    PostLoginModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }