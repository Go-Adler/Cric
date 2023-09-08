import { Component, DoCheck } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LogOutService } from '../log-in/log-out.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class NavComponent implements DoCheck {
  profilePicture: string = 'https://goadlercric.s3.ap-south-1.amazonaws.com/Logos/Default/DefaultProfilePicture.png'
  isLogin: boolean = false
  
  constructor(
    private logOutService: LogOutService,
    private router: Router,
    private authService: AuthService
  ) {}

  profileAreaActive = false;

  ngDoCheck(): void {
    this.isLogin = this.authService.isLogin();
  }

  showProfile() {
    this.profileAreaActive = true;
  }

  hideProfile() {
    this.profileAreaActive = false;
  }

  logOut(): void {
    this.logOutService.logOut();
    this.router.navigate(['/user/log-in']);
  }
}
