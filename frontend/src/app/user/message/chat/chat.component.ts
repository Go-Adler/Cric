import { Component, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from '../../post-login/friends/friends.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ChatService } from './chat.service'

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
  profilePicture!: string
  messages: any = [{ userType: 'sender' }, { userType: 'receiver' }]

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private friendsService: FriendsService
  ) {
    this.userName = this.route.snapshot.paramMap.get('user-name')!
  }

  ngOnInit() {
    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 .,!?'"-]{1,256}$/)]]
    })

    this.isFetching = true
    this.friendsService.getFriendBasicInfo(this.userName)

    this.friendsService.name$.subscribe({
      next: name => {
        this.name = name
        if (this.name) this.isFetching = false
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
      const { message } = this.chatForm.value
      this.chatService.sendMessage(message, this.userName).subscribe({
        next: res => {
          console.log(res, 88)
          this.chatForm.reset()
        }
      })
    }
  }
}