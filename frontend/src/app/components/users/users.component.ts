import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      console.log(data.users);

      this.users = data.users;
    });
  }

  toggleUserBlock(isBlocked: boolean, id: string, i: number) {
    if (isBlocked) {
      this.userService.unblockUser(id).subscribe((response) => {
        this.users[i].isBlocked = response.user.isBlocked;
      });
    } else {
      this.userService.blockUser(id).subscribe((response) => {
        this.users[i].isBlocked = response.user.isBlocked;
      });
    }
  }
}
