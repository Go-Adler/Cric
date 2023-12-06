import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { SocketService } from 'src/app/services/socket.service'
import { UserService } from 'src/app/services/user.service'

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private socketService: SocketService
  ) { }

  logOut(): void {
    this.userService.changeToDefaultProfilePicture()
    localStorage.removeItem('token')
    this.authService.setLoginStatus(false)
    this.socketService.emitLogout()
    this.router.navigate(['/auth/log-in'])
  }
}
