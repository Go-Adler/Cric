import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  constructor(
    private authService: AuthService,
    private userService: UserService
    ) { }

  logOut(): void {
    this.userService.changeToDefaultProfilePicture()
    localStorage.removeItem('token')
    this.authService.setLoginStatus(false);
  }
}
