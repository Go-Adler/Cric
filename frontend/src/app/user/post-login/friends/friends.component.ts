import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'

import { FriendsService } from './friends.service'
import { FriendStatus } from 'src/app/models/responses/userResponses'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  name!: string
  userName: string
  userId!: string
  isOnline!: boolean
  friendsCount!: number
  fetchingData!: boolean
  profilePicture!: string
  friendStatus!: FriendStatus
  requestProgressBar!: boolean

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private friendsService: FriendsService,
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

    this.friendsService.isOnline$.subscribe({
      next: isOnline => {
        console.log(isOnline);
        this.isOnline = isOnline
      }
    })
  }

  ngOnDestroy(): void {
    this.friendsService.changeToDefault()
  }

  addFriend() {
    this.requestProgressBar = true
    this.friendsService.sendFriendRequest(this.userId).subscribe({
      next: response => {
        this.requestProgressBar = false
        this.friendStatus = response.friendStatus
        this.openSnackBar('Request sent')
      }
    })
  }

  acceptRequest() {
    this.requestProgressBar = true
    this.friendsService.acceptRequest(this.userId).subscribe({
      next: response => {
        this.requestProgressBar = false
        this.friendsCount++
        this.openSnackBar('Request accepted')
        this.friendStatus = response.friendStatus
        this.friendsService.friendStatus.next(this.friendStatus)
      }
    })
  }

  rejectRequest() {
    this.requestProgressBar = true
    this.friendsService.rejectRequest(this.userId).subscribe({
      next: response => {
      this.requestProgressBar = false
      this.friendStatus = response.friendStatus
        this.openSnackBar('Request rejected')
      }
    })
  }
  
  openSnackBar(Message: string) {
    this._snackBar.open(Message, 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  removeFriend() {
    this.requestProgressBar = true
    this.friendsService.removeFriend(this.userId).subscribe({
      next: response => {
        this.requestProgressBar = false
        this.friendsCount--
        this.openSnackBar('Friend removed')
        this.friendStatus = response.friendStatus
        this.friendsService.friendStatus.next(this.friendStatus)
      }
    })
  }

  goToMessage() {
    this.router.navigate(['/chat', this.userName])
  }
}
