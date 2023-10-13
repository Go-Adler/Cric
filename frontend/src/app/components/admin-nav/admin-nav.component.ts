import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LogOutService } from 'src/app/user/auth/log-in/log-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class AdminNavComponent {
  constructor(private logOutService: LogOutService, private router: Router) {}
  profileAreaActive = false;

  showProfile() {
    this.profileAreaActive = true;
  }

  hideProfile() {
    this.profileAreaActive = false;
  }

  logOut(): void {
    
    this.logOutService.logOut();
    this.router.navigate(['/user/auth/log-in']);
  }

} 
