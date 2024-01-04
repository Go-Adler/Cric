import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { ConfigService } from 'src/app/services/config.service'
import { I_likePost } from 'src/app/models/responses/postLiked.model'
import { FriendsService } from '../friends.service'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserPostService {
  API_URL!: string
  postLoadingImage = environment.POST_LOADING_IMAGE

  constructor(private configService: ConfigService, private http: HttpClient, private friendsService: FriendsService) {
    this.API_URL = configService.getAPI_BaseURL()
  }

  getPosts(skip: number, userName: string): Observable<any> {
    const postData = { skip, userName }
    return this.http.post<any>(`${this.API_URL}/user/posts/friends-posts`, postData)
  }

  likePost(postId: string): Observable<I_likePost> {
    const postData = { postId }
    return this.http.post<I_likePost>(`${this.API_URL}/user/posts/like-post`, postData)
  }

  unlikePost(postId: string): Observable<I_likePost> {
    const postData = { postId }
    return this.http.post<I_likePost>(`${this.API_URL}/user/posts/unlike-post`, postData)
  }

  getPostLoadingImage() {
    return this.postLoadingImage
  }

  bookmark(postId: string) {
    return this.http.post(`${this.API_URL}/user/posts/bookmark`, { postId })
  }
  
  removeBookmark(postId: string) {
    return this.http.post(`${this.API_URL}/user/posts/remove-bookmark`, { postId })
  }
}
