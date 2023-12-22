import { Component } from '@angular/core'
import { environment } from 'src/environments/environment'
import { MessageService } from './messages.service'
import { ResultItem } from 'src/app/models/responses/user.messageList.model'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messageList: ResultItem[] = []

  messagesIcon = environment.MESSAGES_ICON
  noMessagesIcon = environment.NO_MESSAGES_ICON
  defualtProfilePicture = environment.DEFAULT_PROFILE_PICTURE

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.messageService.getMessages()

    this.messageService.messageList$.subscribe({
      next: data => {
        this.messageList = [...data]
      }
    })
  }

  goToChat(userName: string) {
    this.userService.countDownMessages()
    this.router.navigate(['/chat', userName])
  }
}