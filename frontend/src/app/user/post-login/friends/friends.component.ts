import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  profilePicture: string = '';
  name: string = '';
  userName: string = '';
  friendsCount: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params, 19);
      
      const userId = this.route.snapshot.paramMap.get('id');
      console.log(userId, 20);
      
    });
  }
}
