import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from './friends.service'
import { NotificationService } from '../post-login.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  name: string = ''
  userName: string
  friendsCount: string = ''
  isFriend: boolean = false
  profilePicture: string = ''
  fetchingData: boolean = false

  constructor(
    private route: ActivatedRoute,
    private friendsService: FriendsService,
    private notificationService: NotificationService
  ) {
    this.userName = this.route.snapshot.paramMap.get('user-name')!
  }

  ngOnInit(): void {
    this.friendsService.getFriendBasicInfo(this.userName)

    this.friendsService.fetchComplete$.subscribe({
      next: (fetchComplete) => {
        this.fetchingData = fetchComplete
      },
    })

    this.friendsService.friendsCount$.subscribe({
      next: (friendsCount) => {
        this.friendsCount = friendsCount
      },
    })

    this.friendsService.name$.subscribe({
      next: (name) => {
        this.name = name
      },
    })

    this.friendsService.isFriend$.subscribe({
      next: (isFriend) => {
        this.isFriend = isFriend
      },
    })

    this.friendsService.profilePicture$.subscribe({
      next: (profilePicture) => {
        this.profilePicture = profilePicture
      },
    })
  }

  ngOnDestroy(): void {
    this.friendsService.changeToDefault()
  }

  addFriend() {
    this.friendsService.addFriend(this.userName).subscribe({
      next: res => {
        console.log(res, 71)
        
      }
    })
  }

  connect() {
    this.notificationService.notificationSocketOn()
  }

  disconnect() {
    this.notificationService.emitLogout()
  }
}
