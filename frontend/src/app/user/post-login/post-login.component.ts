import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent {
  // remove later
  constructor(
    private userService: UserService
  ) {}
  
  ngOnInit() {
    this.userService.getUserBasicInfo()
  }
}
