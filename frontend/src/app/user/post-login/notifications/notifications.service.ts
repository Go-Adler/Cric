import { Injectable } from "@angular/core"
import { ConfigService } from "src/app/services/config.service"
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs"
import { NotificationResponse, NotificationMarkAsReadResponse, Notification } from './../../../models/responses/notification.model'
import { UserService } from '../../../services/user.service'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_URL!: string
  private notifications = new BehaviorSubject<Array<Notification>>([])

  notifications$: Observable<Array<Notification>> = this.notifications.asObservable()

  constructor (
    private configService: ConfigService,
    private userService: UserService,
    private http: HttpClient
    ) {
      this.API_URL = configService.getAPI_BaseURL()
  }

  getNotifications() {
    this.http.get<NotificationResponse>(`${this.API_URL}/user/notifications`).subscribe({
      next: response => {
        this.notifications.next(response.notifications)
      }
    })
  }

  markAsRead(notificationId: string): Observable<NotificationMarkAsReadResponse> {
    return this.http.patch<NotificationMarkAsReadResponse>(`${this.API_URL}/user/notifications/mark-as-read`, {notificationId})
  }
}