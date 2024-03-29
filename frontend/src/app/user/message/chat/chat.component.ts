import { Component, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from '../../post-login/friends/friends.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ChatService } from './chat.service'
import { ChatFormMessage, IChatText } from 'src/app/models/responses/messages.model'
import { environment } from 'src/environments/environment'
import { MessageService } from '../../post-login/messages/messages.service'
import { Howl } from 'howler'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  private sound!: Howl;
  name!: string
  userName: string
  isOnline!: boolean
  chatForm!: FormGroup
  isFetching!: boolean
  messages!: IChatText[]
  isFetchingChats!: boolean
  profilePicture: string = environment.DEFAULT_PROFILE_PICTURE

  @ViewChild('chatArea', { static: false }) chatArea!: ElementRef
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private friendsService: FriendsService,
    private messageService: MessageService,
  ) {
    this.userName = this.route.snapshot.paramMap.get('user-name')!
    this.chatService.updateCurrentChat(this.userName)
   
  }

  ngOnInit() {
    this.messageService.updateChatName(this.userName)
    this.name = ''
    this.chatForm = this.fb.group({
      message: ['', [Validators.required]]
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
          this.chatService.fetchChats(this.userName)
        }
      }
    })

    this.chatService.messages$.subscribe({
      next: data => {
        this.messages = [...data]
        if (this.messages) {
          this.isFetchingChats = false
          setTimeout(() => {
            this.scrollToBottom()
          }, 50);
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
        if (profilePicture) this.profilePicture = profilePicture
      }
    })
  }

  onSubmit() {
   this.soundPlay()
    if (this.chatForm.valid) {
      const { message }: ChatFormMessage = this.chatForm.value
      this.chatService.addNewMessage(message, true)
      this.chatForm.reset()
      setTimeout(() => {
        this.scrollToBottom()
      }, 50);
      this.chatService.sendMessage(message, this.userName).subscribe({
        next: res => {
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

  ngOnDestroy() {
    this.chatService.removeCurrentChat()
    this.messageService.removeChatName()
  }

  soundPlay () {
    this.sound = new Howl({
      src: ['assets/sent.mp3'],
      autoplay: false
    });
    this.sound.play()
  }

}