import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ConfigService } from "src/app/services/config.service";
import { messageResponse } from "src/app/models/responses/message.model";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class OTP_Service {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  verifyOTP(otp: string, userData: User): Observable<messageResponse> {
    const OTP_Data = { otp, userData }

    return this.http.post<messageResponse>(`${this.API_URL}/user/sign-up-otp`, OTP_Data)
  }
}