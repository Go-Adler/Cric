import { Component } from '@angular/core';
import { io } from 'socket.io-client'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent {
  private socket: any

  constructor(private config: ConfigService) {
    const API_URL = config.getAPI_BaseURL()
    console.log(API_URL, 15);
    console.log(10);
    this.socket = io(API_URL)
    
  }
}
