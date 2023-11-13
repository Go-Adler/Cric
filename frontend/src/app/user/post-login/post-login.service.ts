import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // private socket: any;
  private API_URL!: string;
  private subscriptions: Subscription[] = [];
  private userName: string = '';

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    // private userService: UserService,
  ) {
    this.API_URL = configService.getAPI_BaseURL();
  }

  notificationSocketOn() {
   
  }

  start() {
    // return this.http.get(`${this.API_URL}/user/socket`);
  }
  
  // Emit a "like" event
  emitLikeNotification(postId: string, userId: string) {
    // this.socket.emit('like-post', { postId, user: userId });
  }

  // Emit a "dislike" event
  emitDislikeNotification(postId: string, userId: string) {
    // this.socket.emit('dislike-post', { postId, user: userId });
  }

  // Emit a "dislike" event
  emitLogout() {
    // this.socket.emit('disconnect-request');
  }

  
}
