import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { LogInComponent } from './log-in/log-in.component'
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from './auth.component'


@NgModule({
  declarations: [
    LogInComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
