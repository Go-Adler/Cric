import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { messageResponse } from 'src/app/models/responses/message.model'
import { ConfigService } from '../../services/config.service'
import { User } from 'src/app/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  API_URL!:string

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  signUp(userData: User): Observable<messageResponse> {

    return this.http.post<messageResponse>(`${this.API_URL}/user/sign-up`, userData)
  }
}