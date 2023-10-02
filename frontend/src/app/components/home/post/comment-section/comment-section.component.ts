import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { CommentService } from './new-comment/new-comment.service'
import { I_post } from 'src/app/models/responses/message.model'

const POSTS_LIMIT = 6;

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit{
  private subscriptions: Subscription[] = [];
  posts: any[] = [];
  skip = 0;
  spinner = true;
  firstFetch = false;
  fetchingPosts = false;
  postsEnd = false;



  @Input() userName!: string
  @Input() name!: string
  @Input() profilePicture!: string
  @Input() postId!: string


  newPostData: any


  constructor(private commentsService: CommentService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.commentsService.getComments(this.skip, this.postId).subscribe(
        (data) => {
          console.log(data, 37);
          
          this.spinner = false;
          this.firstFetch = true;
          this.posts = data.comments;
        },
        (error) => {
          console.error(error);
          this.spinner = false;
        }
      )
    )
  }
  
  // Load more posts
  loadMore(): void {
    this.fetchingPosts = true;
    this.skip += POSTS_LIMIT;
    this.subscriptions.push(
      this.commentsService.getComments(this.skip, this.postId).subscribe(
        (data) => {
          this.fetchingPosts = false;
          const postExists = data.comments[0];
          if (postExists) {
            this.posts = [...this.posts, ...data.comments];
          } else {
            this.postsEnd = true;
          }
        },
        (error) => {
          console.error(error);
          this.fetchingPosts = false;
        }
      )
    );
  }

  toggleLike(i: string, b: string) {
    this.posts = []
  }

  newPostSuccess(postData: any) {
    this.posts.unshift(postData)
  }
}
