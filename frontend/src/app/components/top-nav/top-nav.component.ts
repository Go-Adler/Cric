import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit{
  profilePicture:string = ''

  constructor(
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.userService.profilePicture$.subscribe( profilePicture => {
      this.profilePicture = profilePicture
    })
  }
}
