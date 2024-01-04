import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/services/config.service'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) { 
    this.API_URL = configService.getAPI_BaseURL()
  }

  updateProfilePicture(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/profile/update/profile-picture`, formData);
  }

  updateUserInfo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/profile/update/user-info`, formData);
  }
}
