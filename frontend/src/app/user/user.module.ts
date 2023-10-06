import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserComponent } from './user.component'

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }