import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MessageRoutingModule } from './message-routing.module'
import { MessageComponent } from './message.component'
import { PostLoginModule } from '../post-login/post-login.module';
import { ChatComponent } from './chat/chat.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    MessageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    PostLoginModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MessageRoutingModule,
  ]
})
export class MessageModule { }
