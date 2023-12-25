import { Howl } from 'howler'
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable } from "rxjs"

import { ChatService } from "../../message/chat/chat.service"
import { ConfigService } from "src/app/services/config.service"
import { ResultItem } from "src/app/models/responses/user.messageList.model"

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private sound!: Howl;
  private API_URL
  private currentChat = ''
  private messageList = new BehaviorSubject<Array<ResultItem>>([])

  messageList$: Observable<Array<ResultItem>> = this.messageList.asObservable()


  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private chatService: ChatService,
  ) {
   
    this.API_URL = this.config.getAPI_BaseURL()
  }

  ngOnInit () {
    this.chatService.currentChat$.subscribe({
      next: chatName => {
        console.log(chatName, 30);
        this.currentChat = chatName
      }
    })
  }

  getMessages() {
    this.http.get<any>(`${this.API_URL}/user/message/get-messages`).subscribe({
      next: response => {
        this.messageList.next(response.messages)
      }
    })
  }

  addMessage(res: any) {
    if (this.currentChat === res.userName) {
      this.chatService.addNewMessage(res.message)
      this.chatService.markAsRead(res.userName)
      this.playReceiveSound()
      return
    }
    this.playSound()

    // Get the current value of the messageList
    const currentMessages = this.messageList.getValue()
    
    const resultItemIndex = currentMessages.findIndex(
      (item) => item.personDetails.userName === res.userName
    )
    
    if (resultItemIndex !== -1) {
      // Clone the resultItem to avoid modifying the original object
      const updatedResultItem = { ...currentMessages[resultItemIndex] };
    
      // Update the message property
      updatedResultItem.latestChatText.message = res.message; 
      updatedResultItem.read = false

    
      // Remove the updated resultItem from its current position
      const updatedMessages = currentMessages.filter((_, index) => index !== resultItemIndex);
    
      // Add the updated resultItem to the beginning of the array
      updatedMessages.unshift(updatedResultItem);
    
      // Update the messageList with the new array of messages
      this.messageList.next(updatedMessages);
    } else {
      const newMessage = {
        personDetails: {
          email: '',
          userName: res.userName,
          name: res.userName,
          profilePicture: '',
          socketId: []
        },
        latestChatText: {
          message: res.message,
          sendByUser: false,
          _id: res.userId,
          time: new Date()
        },
        read: false
      }
      // Add the new message to the current messages
      const updatedMessages = [newMessage, ...currentMessages]

      // Update the messageList with the new array of messages
      this.messageList.next(updatedMessages)
    }
  }

  updateChatName(userName: string) {
    this.currentChat = userName
  }

  playSound() {
    this.sound = new Howl({
      src: ['assets/iphone_notification.mp3'],
      autoplay: false
    });
    this.sound.play()
  }

  playReceiveSound() {
      this.sound = new Howl({
        src: ['assets/sent.mp3'],
        autoplay: false
      });
      this.sound.play()
  }

  removeChatName() {
    this.currentChat = ''
  }
}