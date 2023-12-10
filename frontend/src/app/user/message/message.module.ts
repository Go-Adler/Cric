import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MessageRoutingModule } from './message-routing.module'
import { MessageComponent } from './message.component'
import { PostLoginModule } from '../post-login/post-login.module';
import { ChatComponent } from './chat/chat.component'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [
    MessageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    PostLoginModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
