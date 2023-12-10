import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from '../../post-login/friends/friends.service'; 
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
  messages: any = [{userType:'sender'}, { userType: 'receiver'}]
  
  @ViewChild('scoll') scroll!:ElementRef
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private friendsService: FriendsService
    ) {
      this.userName = this.route.snapshot.paramMap.get('user-name')!
    }

    ngAfterViewInit() {
      this.scrollToBottom();
    }

    scrollToBottom(): void {
      try {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
      } catch (err) {
        console.log(35);
        
      }
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
    
    setTimeout(() => {
      if (this.scroll) {
      this.scroll.nativeElement.scrollIntoView({behaviour: 'smooth'})

      }
    }, 200);

    this.scrollToBottom();

  }

  onSubmit() {
    
    if (this.chatForm.valid) {
      const  { message } = this.chatForm.value
        this.chatService.sendMessage(message).subscribe({
          next: res => {
            console.log(res, 88);
            this.chatForm.reset()
          }
      })
    }
  }
}