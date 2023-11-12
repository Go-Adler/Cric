import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { io } from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  private API_URL!: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    // this.API_URL = configService.getAPI_BaseURL()
    // this.subscriptions.push(
    //   this.userService.userName$.subscribe({
    //     next: userName => this.userName = userName
    //   })
    // )
    //   console.log(29, this.userName);
    // this.socket = io(this.API_URL, {
    //   query: {
    //     userName: this.userName
    //   },
    // })
  }

  connect(userName: string) {
    this.socket = io(this.API_URL, {
      query: {
        userName: userName,
      },
    });
  }
  notificationSocketOn() {
    this.socket.on('connect', () => {
      console.log(this.socket.id, 20);
    });
    console.log(19);

    // Handle incoming notifications
    this.socket.on('notification', (data: any) => {
      console.log('Received Notification:', data);
      // You can process and display the notification as needed in your application
    });
  }

  start() {
    return this.http.get(`${this.API_URL}/user/socket`);
  }
  // Emit a "like" event
  emitLikeNotification(postId: string, userId: string) {
    this.socket.emit('like-post', { postId, user: userId });
  }

  // Emit a "dislike" event
  emitDislikeNotification(postId: string, userId: string) {
    this.socket.emit('dislike-post', { postId, user: userId });
  }

  // Emit a "dislike" event
  emitLogout() {
    this.socket.emit('disconnect-request');
  }
  getSocket() {
    return this.socket;
  }
}
