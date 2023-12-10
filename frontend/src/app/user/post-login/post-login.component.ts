import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'
import { SocketService } from 'src/app/services/socket.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent {
  userName!: string
  
  // remove later
  constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {
  }
  
  ngOnInit() {
    this.userService.getUserBasicInfo()
    this.userService.userName$.subscribe({
      next: userName => {
        this.userName = userName
        if (userName) this.socketService.connect(userName)
      }
    })
  }

  showTopNav = true;

 
  ngOnDestroy() {
    this.socketService.emitLogout()
  }
}
