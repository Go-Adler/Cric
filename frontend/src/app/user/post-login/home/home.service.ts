import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/services/config.service'
import { I_likePost } from 'src/app/models/responses/postLiked.model'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  API_URL!: string
  postLoadingImage: string = 'https://goadlercric.s3.ap-south-1.amazonaws.com/assets/Loading-removebg-preview.png'
  
  constructor(private configService: ConfigService, private http: HttpClient) { 
    this.API_URL = configService.getAPI_BaseURL()
  }

  getPosts(skip: number): Observable<any> {
    const postData = { skip }
    return this.http.post<any>(`${this.API_URL}/user/posts`, postData);
  }

  likePost(postId: string): Observable<I_likePost> {
    const postData = { postId }
    return this.http.post<I_likePost>(`${this.API_URL}/user/posts/like-post`, postData);
  }

  unlikePost(postId: string): Observable<I_likePost> {
    const postData = { postId }
    return this.http.post<I_likePost>(`${this.API_URL}/user/posts/unlike-post`, postData);
  }

  getPostLoadingImage() {

    return this.postLoadingImage
  }
}
