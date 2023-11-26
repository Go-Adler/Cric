import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ConfigService } from '../../../services/config.service'
import { Post } from '../../../models/post.model'

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

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/user/posts/${postId}`)
  }
}