import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ConfigService } from "src/app/services/config.service"

@Injectable({
  providedIn:'root'
})
export class ChatService {
  private API_URL: string

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  sendMessage(message: string) {
    return this.http.post(`${this.API_URL}/user/send-message`, { message })
  }
}