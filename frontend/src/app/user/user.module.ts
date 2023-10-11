import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserComponent } from './user.component'
import { HomeModule } from './post-login/home/home.module'

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    AuthModule,
    CommonModule,
    HomeModule,
    UserRoutingModule,
  ]
})
export class UserModule { }