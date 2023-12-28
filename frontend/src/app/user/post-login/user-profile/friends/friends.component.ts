import { Component } from '@angular/core';
import { FriendsService } from './friends.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  private friendsList: any[]
  constructor( private friendsService: FriendsService){}
  ngOnInit() {
    this.friendsService.getFriendsList().subscribe({
      next: res => {
        console.log(res, 15);
        
      }
    })
  }
}
