import { Component } from '@angular/core';

import { FriendsService } from './friends.service'
import { Friend } from 'src/app/models/responses/friendList.model';
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  friendsList!: Friend[]
  defaultProfilePicture = environment.DEFAULT_PROFILE_PICTURE

  constructor(
    private friendsService: FriendsService,
    private router: Router
    ){}
  ngOnInit() {
    this.friendsService.getFriendsList().subscribe({
      next: (res: any) => {
        this.friendsList = res.friends
      }
    })
  }

  goToFriendProfile(userName: string) {
    this.router.navigate(['/user', userName]);
  }
}
