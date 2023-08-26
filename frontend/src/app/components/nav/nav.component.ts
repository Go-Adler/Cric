import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NavComponent {
  profileAreaActive = false

  showProfile() {
    this.profileAreaActive = true
    console.log(13);
    
  }

  hideProfile() {
    this.profileAreaActive = false
  }
  
}
