import { Injectable } from "@angular/core"
import { ConfigService } from "src/app/services/config.service"
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_URL!: string

  constructor (
    private configService: ConfigService,
    private http: HttpClient
    ) {
      this.API_URL = configService.getAPI_BaseURL()
  }

  getNotifications(): Observable<any> {
    const
  }

}