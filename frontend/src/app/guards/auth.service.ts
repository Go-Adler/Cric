import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../services/config.service"
import { Observable } from "rxjs"
import { messageResponse } from "../models/responses/message.model"

@Injectable ({
  providedIn: 'root'
})
export class GuardService {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  verifyToken (token: string): Observable<messageResponse> {
    const userToken = { token } 
    return this.http.post<messageResponse> (`${this.API_URL}/user/verify-token`, userToken)
  }
}