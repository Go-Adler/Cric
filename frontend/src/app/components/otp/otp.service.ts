import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ConfigService } from "src/app/services/config.service";
import { messageResponse } from "src/app/models/responses/message.model";

@Injectable({
  providedIn: 'root'
})
export class OTP_Service {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  verifyOTP(otp: string, email: string): Observable<messageResponse> {
    const OTP_Data = { otp, email }

    return this.http.post<messageResponse>(`${this.API_URL}/user/sign-up-otp`, OTP_Data)
  }

  changePassword(password: string): Observable<messageResponse> {
    const passwordData = { password }

    return this.http.post<messageResponse>(`${this.API_URL}/user/changePassword`, passwordData)
  }
}