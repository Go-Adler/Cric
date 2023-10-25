import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FriendsService } from './friends.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  profilePicture: string = '';
  name: string = '';
  userName: string | null = '';
  friendsCount: string = '';
  fetchingData: boolean = false

  constructor(private route: ActivatedRoute, private friendsService: FriendsService ) {}

  ngOnInit(): void {

    this.friendsService.fetchComplete$.subscribe({
      next: fetchComplete => {
        this.fetchingData = fetchComplete
      }
    })
    this.route.paramMap.subscribe(params => {
      const userId = this.route.snapshot.paramMap.get('id')
      this.userName = userId!
      this.friendsService.getFriendBasicInfo(this.userName)
    })

    this.friendsService.friendsCount$.subscribe({
      next: friendsCount => {
        this.friendsCount = friendsCount
      }
    })
  

    this.friendsService.name$.subscribe({
      next: name => {
        this.name = name
      }
    })

    this.friendsService.profilePicture$.subscribe({
      next: profilePicture => {
        this.profilePicture = profilePicture
      }
    })
  }

  ngOnDestroy(): void {
    this.friendsService.changeToDefault()
  }

  addFriend() {
    console.log(57);
  }
}
