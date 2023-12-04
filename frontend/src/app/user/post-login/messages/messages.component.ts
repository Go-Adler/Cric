import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messagesIcon  = environment.MESSAGES_ICON
  noMessagesIcon = environment.NO_MESSAGES_ICON
  messages: any = []
}
