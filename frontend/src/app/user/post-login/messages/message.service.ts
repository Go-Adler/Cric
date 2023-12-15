import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ConfigService } from "src/app/services/config.service"

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private API_URL
  
  constructor(
    private config: ConfigService,
    private http: HttpClient
    ) {
      this.API_URL = this.config.getAPI_BaseURL()
    }

  getMessages() {
   return this.http.get(`${this.API_URL}/user/message/get-messages`)
  }
}