import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component'


@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    PostLoginRoutingModule
  ]
})
export class PostLoginModule { }
