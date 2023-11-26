import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostService } from './post.service'
import { UserPostService } from '../friends/user-post/user-post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  postId: string | null
  post: any
  postLoadingImage: string
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userPostService: UserPostService
  ){
    this.postId = this.route.snapshot.paramMap.get('id')
    this.postLoadingImage = this.userPostService.getPostLoadingImage();

  }
  ngOnInit() {
    if (this.postId) {
     this.postService.getPost(this.postId).subscribe({
      next: data => {
         this.post = data.post
      }
     })
    }
  }

   // Toggle like for a post
   toggleLike(isLiked: boolean, postId: string): void {
    if (isLiked) {
        this.post.engagement.liked = false;
        this.post.actions.likes--;
        this.userPostService.unlikePost(postId).subscribe({
          error: () => {
            this.post.engagement.liked = true;
            this.post.actions.likes++;
          },
        })
    } else {
        this.post.engagement.liked = true;
        this.post.actions.likes++;
        this.userPostService.likePost(postId).subscribe({
          error: () => {
            this.post.engagement.liked = false;
            this.post.actions.likes--;
          },
        })
    }
  }

  handleImageError() {
    console.log('lazy loading image error')

  }
}
