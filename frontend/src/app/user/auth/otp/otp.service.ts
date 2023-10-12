import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  verificationOTP(otp: string): Observable<messageResponse> {
    const OTP_Data = { otp }

    return this.http.post<messageResponse>(`${this.API_URL}/user/verification`, OTP_Data)
  }

  changePassword(password: string): Observable<messageResponse> {
    const passwordData = { password }

    return this.http.post<messageResponse>(`${this.API_URL}/user/changePassword`, passwordData)
  }

  resendOtp(): Observable<messageResponse> {
    console.log(31);
    
    return this.http.get<messageResponse>(`${this.API_URL}/user/resend-otp`)
  }

  forgotPasswordOtp(otp: string): Observable<messageResponse> {
    const OTP_Data = { otp }

    return this.http.post<messageResponse>(`${this.API_URL}/user/forgot-password-otp`, OTP_Data)
  }
}