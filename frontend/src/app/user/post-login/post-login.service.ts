import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ConfigService } from "src/app/services/config.service"
import { io } from "socket.io-client"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: any
  private API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  notificationSocketOn() {
    console.log(this.socket, 'init sock id', 18);
    
    this.socket = io(this.API_URL)
    this.socket.on('connect', () => {
      console.log(this.socket.id, 20);
    })
    console.log(19);
    
     // Handle incoming notifications
     this.socket.on('notification', (data: any) => {
      console.log('Received Notification:', data);
      // You can process and display the notification as needed in your application
    });


  }

  start() {
    return this.http.get(`${this.API_URL}/user/socket`)
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
      this.socket.emit('disconnect');
    }
}