import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  constructor(private authService: AuthService) { }

  logOut(): void {
    localStorage.removeItem('token')
    this.authService.setLoginStatus(false);
  }
}
