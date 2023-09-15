import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) { 
    this.API_URL = configService.getAPI_BaseURL()
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/admin/users`);
  }

  blockUser(userId: string): Observable<any> {
    const userData = { userId }
    return this.http.post<any>(`${this.API_URL}/admin/block-user`, userData);
  }

  unblockUser(userId: string): Observable<any> {
    const userData = { userId }
    return this.http.post<any>(`${this.API_URL}/admin/unblock-user`, userData);
  }
}

