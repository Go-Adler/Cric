import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './websocket.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newPostData: any;

  constructor(private wsService: WebSocketService) { }
  
  ngOnInit(): void {
    this.wsService.onMessage().subscribe((message) => {
      console.log('Received:', message);
    });
  }

  newPostSuccess(postData: any) {
    this.newPostData = postData;
  }

  callSocket() {
    console.log(16);
    
    this.wsService.sendMessage('s')
  }
}
