import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LogOutService } from '../log-in/log-out.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
export class NavComponent implements OnInit {
  profilePicture: string = ''
  name: string = ''
  
  constructor(
    private logOutService: LogOutService,
    private router: Router,
    private userService: UserService
  ) {}

  profileAreaActive = false;

  ngOnInit(): void {
   this.userService.profilePicture$.subscribe( profilePicture => {
    this.profilePicture = profilePicture    
   }) 

   this.userService.name$.subscribe( name => {
    this.name = name
   })
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
