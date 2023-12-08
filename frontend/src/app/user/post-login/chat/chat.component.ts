import { Component } from '@angular/core';
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
  
  constructor(
    private route: ActivatedRoute,
    private friendsService: FriendsService
    ) {
      this.userName = this.route.snapshot.paramMap.get('user-name')!
    }

  ngOnInit() {
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
}
