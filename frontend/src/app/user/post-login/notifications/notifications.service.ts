import { Injectable } from "@angular/core"
import { ConfigService } from "src/app/services/config.service"
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs"
import { Notification } from './../../../models/responses/notification.model'
import { UserService } from '../../../services/user.service'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_URL!: string

  constructor (
    private configService: ConfigService,
    private userService: UserService,
    private http: HttpClient
    ) {
      this.API_URL = configService.getAPI_BaseURL()
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.API_URL}/user/notifications`)
  }

}