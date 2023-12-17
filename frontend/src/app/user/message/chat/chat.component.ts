import { Component, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from '../../post-login/friends/friends.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ChatService } from './chat.service'
import { ChatFormMessage, IChatText } from 'src/app/models/responses/messages.model'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  name!: string
  userName: string
  isOnline!: boolean
  isFetching!: boolean
  chatForm!: FormGroup
  profilePicture: string = environment.DEFAULT_PROFILE_PICTURE
  isFetchingChats!: boolean
  messages!: IChatText[]

  @ViewChild('chatArea', { static: false }) chatArea!: ElementRef
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private friendsService: FriendsService
  ) {
    this.userName = this.route.snapshot.paramMap.get('user-name')!
  }

  ngOnInit() {
    console.log(35);
    this.name = ''
    
    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 .,!?'"-]{1,256}$/)]]
    })

    this.profilePicture = environment.DEFAULT_PROFILE_PICTURE
    this.isFetching = true
    this.friendsService.getFriendBasicInfo(this.userName)

    this.friendsService.name$.subscribe({
      next: name => {
        this.name = name
        if (this.name) {
          this.isFetching = false
          this.isFetchingChats = true
          this.friendsService.fetchChats(this.userName).subscribe({
            next: res => {
              this.isFetchingChats = false
              this.messages = res.messages
              setTimeout(() => {
                this.scrollToBottom()
              }, 50);
            }
          })
        }
      }
    })

    this.friendsService.isOnline$.subscribe({
      next: isOnline => {
        this.isOnline = isOnline
      }
    })

    this.friendsService.profilePicture$.subscribe({
      next: profilePicture => {
        this.profilePicture = profilePicture
      }
    })
  }

  onSubmit() {
    if (this.chatForm.valid) {
      const { message }: ChatFormMessage = this.chatForm.value
      this.messages.push({ message, time: new Date, sendByUser: true })
      this.chatForm.reset()
      setTimeout(() => {
        this.scrollToBottom()
      }, 50);
      this.chatService.sendMessage(message, this.userName).subscribe({
        next: res => {
          console.log(res, 88)
        }
      })
    }
  }

  private scrollToBottom() {
    // Use nativeElement to access the DOM element
    const chatAreaElement: HTMLElement = this.chatArea.nativeElement

    // Scroll to the bottom
    chatAreaElement.scrollTop = chatAreaElement.scrollHeight
  }
}