import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ConfigService } from '../../../services/config.service'
import { PostResponse } from '../../../models/post.model'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  getPost(postId: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.API_URL}/user/posts/${postId}`)
  }
}