import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket, io } from 'socket.io-client';
import { UserService } from './user.service'
import { ConfigService } from 'src/app/services/config.service';
import { NotificationService } from '../user/post-login/notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket | null
  private API_URL!: string;
  
  constructor(
    private http: HttpClient,
    private userService: UserService,
      private configService: ConfigService,
      private notificationService: NotificationService
    ) {
    this.API_URL = this.configService.getAPI_BaseURL()
  }

  connect(userName: string) {
    if (!this.socket) {
      this.socket = io(this.API_URL, {
        query: {
          userName,
        },
      });
      this.notificationSocketOn()
    }
  }

  notificationSocketOn() {
  if (this.socket) {
    this.socket.on('disconnect', () => {
    });

    // Handle incoming notifications
    this.socket.on('notification', () => {
      this.userService.updateNotificationsCount()
      this.notificationService.getNotifications()
    });

    this.socket.on('message', () => {
      this.userService.updateNotificationsCount()
      this.notificationService.getNotifications()
    });
  }

  }

  start() {
    return this.http.get(`${this.API_URL}/user/socket`);
  }

  // Emit a "like" event
  emitLikeNotification(postId: string, userId: string) {
   if(this.socket) this.socket.emit('like-post', { postId, user: userId });
  }

  // Emit a "dislike" event
  emitDislikeNotification(postId: string, userId: string) {
    if(this.socket) this.socket.emit('dislike-post', { postId, user: userId });
  }

  // Emit a "dislike" event
  emitLogout() {
    if(this.socket) this.socket.close()
    this.socket = null
  }

  getSocket() {
    return this.socket;
  }
}
