import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogin: boolean = false

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.setLoginStatus(this.authService.checkToken());
    this.authService.loginStatus$.subscribe(
      {
        next: status => {
          this.isLogin = status;
        }
      }
    );
  }
}
