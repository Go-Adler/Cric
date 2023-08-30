import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  API_URL!: string

  constructor(private configService: ConfigService, private http: HttpClient) { 
    this.API_URL = configService.getAPI_BaseURL()
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/user/posts`);
  }
}
