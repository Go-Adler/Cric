import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_postResponse } from 'src/app/models/responses/message.model';
import { ConfigService } from 'src/app/services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  API_URL!: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL();
  }

  newPost(formData: FormData): Observable<I_postResponse> {
    return this.http.post<I_postResponse>(`${this.API_URL}/user/posts/post`, formData);
  }
}
