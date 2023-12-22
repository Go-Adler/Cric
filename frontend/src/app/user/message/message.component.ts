import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  // remove late
  constructor(
    private userService: UserService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.userService.getUserBasicInfo()
    this.userService.userName$.subscribe({
      next: userName => {
        if (userName) this.socketService.connect(userName)
      }
    })
  }
  
  ngOnDestroy() {
    this.socketService.emitLogout()
  }
}
