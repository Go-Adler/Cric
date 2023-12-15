import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messagesIcon  = environment.MESSAGES_ICON
  noMessagesIcon = environment.NO_MESSAGES_ICON
  messages: any[] = [1, 2, 3, 4, 55,5,5,5,5,5,,5,]

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages().subscribe()
  }
}
