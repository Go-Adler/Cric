import { Component } from '@angular/core';
import { GuardService } from 'src/app/guards/guard.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
 constructor(private guardService: GuardService) {
  const token = localStorage.getItem('token')
  guardService.verifyToken(token || 'token').subscribe(
    response => {
      console.log(response);
      
    }
  )
 }


}
