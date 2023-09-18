import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  profilePicture: string = ''

  constructor(
    private userService: UserService
  ) {}

    ngOnInit(): void {
      this.userService.profilePicture$.subscribe( profilePicture => {
        this.profilePicture = profilePicture
      })
    }
}
