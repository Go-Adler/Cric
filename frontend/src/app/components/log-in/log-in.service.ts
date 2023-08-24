import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { I_LoginResponse } from "src/app/models/responses/login.model"
import { ConfigService } from "src/app/services/config.service"

@Injectable({
  providedIn: 'root'
})
export class loginService {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  
  login(email:string, password: string): Observable<I_LoginResponse> {
    const loginData = { email, password }

    return this.http.post<I_LoginResponse>(`${this.API_URL}/user/log-in`, loginData)
  }
}