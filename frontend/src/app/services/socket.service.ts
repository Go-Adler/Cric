import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { io } from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  private API_URL!: string;
  private notificationCount = new BehaviorSubject<number>(0)

  notificationCount$: Observable<number> = this.notificationCount.asObservable()

  
  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
    // this.notificationSocketOn()
  }

  connect(userName: string) {
    this.socket = io(this.API_URL, {
      query: {
        userName,
      },
    });

    this.notificationSocketOn()
    return this.socket
  }
  notificationSocketOn() {
    this.socket.on('connect', () => {
      console.log(this.socket.id, 20);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected', this.socket.id);
    });
    console.log(19);

    // Handle incoming notifications
    this.socket.on('notification', (data: any) => {
      let currentCount = this.notificationCount.value
      currentCount++
      this.notificationCount.next(currentCount)
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
