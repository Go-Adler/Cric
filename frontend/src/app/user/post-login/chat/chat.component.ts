import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from '../friends/friends.service'

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
  profilePicture!: string
  end!: ElementRef
  // arrays: any = [1,1,1,1,1,1,,1,1]
  arrays: any = [1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,,1,1]
  
  @ViewChild('scoll') scroll!:ElementRef
  constructor(
    private route: ActivatedRoute,
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
    this.arrays.lenght = 50
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
}
