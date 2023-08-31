import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { I_LoginResponse } from 'src/app/models/responses/login.model';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  API_URL!: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL();
  }

  forgotPassword(email: string): Observable<I_LoginResponse> {
    const forgotData = { email }
    return this.http.post<I_LoginResponse>(
      `${this.API_URL}/user/forgot-password`,
      forgotData
    );
  }
}