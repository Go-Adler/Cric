import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { ResultItem } from "src/app/models/responses/user.messageList.model"
import { ConfigService } from "src/app/services/config.service"
import { ChatService } from "../../message/chat/chat.service"

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private API_URL
  private messageList = new BehaviorSubject<Array<ResultItem>>([])
  private currentChat = ''

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
    console.log('36 add message', this.currentChat, res.userName, '40');
    if (this.currentChat === res.userName) {
      console.log(37);
      this.chatService.addNewMessage(res.message)
      return
    }

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
}