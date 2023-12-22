import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { IChatText, MessageResponse } from "src/app/models/responses/messages.model"
import { ConfigService } from "src/app/services/config.service"

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private API_URL: string
  private messages = new BehaviorSubject<Array<IChatText>>([])
  private currentChat = new BehaviorSubject<string>('')

  currentChat$: Observable<string> = this.currentChat.asObservable()
  messages$: Observable<Array<IChatText>> = this.messages.asObservable()


  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  fetchChats(userName: string) {
    this.currentChat.next(userName)
    this.http.post<MessageResponse>(`${this.API_URL}/user/message/get-messages`, { userName }).subscribe({
      next: res => {
        this.messages.next(res.messages)
      }
    })
  }

  sendMessage(message: string, userName: string) {
    return this.http.post(`${this.API_URL}/user/message/send-message`, { message, userName })
  }

  addNewMessage(message: string, sendByUser = false) {
    const newMessage: IChatText = {
      message,
      sendByUser,
      time: new Date,
    }
    // Get the current value of the messages
    const currentMessages = this.messages.getValue()

    // Add the new message to the current messages
    const updatedMessages = [...currentMessages, newMessage]

    // Update the messages with the new array of messages
    this.messages.next(updatedMessages)
  }

  removeCurrentChat() {
    this.currentChat.next('')
  }

  updateCurrentChat(userName: string) {
    this.currentChat.next(userName)
  }
}