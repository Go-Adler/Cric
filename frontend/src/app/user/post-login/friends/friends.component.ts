import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'

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
  userId: string = ''
  friendsCount: string = ''
  friendStatus: string = ''
  profilePicture: string = ''
  fetchingData: boolean = false

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private friendsService: FriendsService,
    private notificationService: NotificationService,
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

    this.friendsService.friendStatus$.subscribe({
      next: (friendStatus) => {
        this.friendStatus = friendStatus
      },
    })

    this.friendsService.profilePicture$.subscribe({
      next: (profilePicture) => {
        this.profilePicture = profilePicture
      },
    })

    this.friendsService.userId$.subscribe({
      next: userId => {
        this.userId = userId
      }
    })
  }

  ngOnDestroy(): void {
    this.friendsService.changeToDefault()
  }

  addFriend() {
    this.friendsService.sendFriendRequest(this.userId).subscribe({
      next: res => {
      this.friendStatus = res.friendStatus
        this.openSnackBar()
      }
    })
  }

  openSnackBar() {
    this._snackBar.open('Request sent', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  connect() {
    this.notificationService.notificationSocketOn()
  }

  disconnect() {
    this.notificationService.emitLogout()
  }
}
