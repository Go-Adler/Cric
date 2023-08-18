import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User, SignUpResponse } from '../../models/user.model'
import { ConfigService } from '../../services/config.service'

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  API_URL!:string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  signUp(userData: User): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.API_URL}/user`, userData)
  }
}