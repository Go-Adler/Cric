import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  logOut(): void {
    console.log(17);
    
    this.userService.changeToDefaultProfilePicture();
    localStorage.removeItem('token');
    this.authService.setLoginStatus(false);
    this.router.navigate(['user/auth/log-in']);
  }
}
