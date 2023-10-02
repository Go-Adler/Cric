import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I_postResponse } from 'src/app/models/responses/message.model';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  API_URL!: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.API_URL = configService.getAPI_BaseURL();
  }

  newComment(formData: FormData): Observable<I_postResponse> {
    return this.http.post<I_postResponse>(`${this.API_URL}/user/posts/new-comment`, formData);
  }

  getComments(skip: number, postId: string): Observable<any> {
    const postData = { skip, postId }
    return this.http.post<I_postResponse>(`${this.API_URL}/user/posts/comments`, postData);
  }
}
