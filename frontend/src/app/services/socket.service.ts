import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { io } from 'socket.io-client';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  private API_URL!: string;
  
  constructor(
      private configService: ConfigService,
      private userService: UserService,
      private http: HttpClient,
    ) {
    this.API_URL = configService.getAPI_BaseURL()
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
      console.log(this.socket.id, 'socket connected', 20);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected', this.socket.id);
    });

    // Handle incoming notifications
    this.socket.on('notification', (data: any) => {
      console.log(43, 'notification called'); 
      this.userService.updateNotificationsCount()
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
