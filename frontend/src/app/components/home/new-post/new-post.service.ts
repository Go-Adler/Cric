import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messageResponse } from 'src/app/models/responses/message.model';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class NewPostService {
  API_URL!: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL();
  }

  newPost(formData: FormData): Observable<messageResponse> {
    return this.http.post<messageResponse>(`${this.API_URL}/user/post`, formData);
  }
}
