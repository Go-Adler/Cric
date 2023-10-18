import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentService } from './new-comment/new-comment.service';
import { I_post } from 'src/app/models/responses/message.model';

const POSTS_LIMIT = 6;

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  posts: any[] = [];
  skip = 0;
  spinner = true;
  firstFetch = false;
  fetchingPosts = false;
  postsEnd = false;

  @Input() userName!: string;
  @Input() name!: string;
  @Input() profilePicture!: string;
  @Input() postId!: string;

  newPostData: any;

  constructor(private commentsService: CommentService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.commentsService.getComments(this.skip, this.postId).subscribe({
        next: (data) => {
          this.spinner = false;
          this.firstFetch = true;
          this.posts = data.comments;
        },
        error: (error) => {
          console.error(error);
          this.spinner = false;
        },
      })
    );
  }

  // Load more posts
  loadMore(): void {
    this.fetchingPosts = true;
    this.skip += POSTS_LIMIT;
    this.subscriptions.push(
      this.commentsService.getComments(this.skip, this.postId).subscribe({
        next: (data) => {
          this.fetchingPosts = false;
          const postExists = data.comments[0];
          if (postExists) {
            this.posts = [...this.posts, ...data.comments];
          } else {
            this.postsEnd = true;
          }
        },
        error: (error) => {
          console.error(error);
          this.fetchingPosts = false;
        },
      })
    );
  }

  // Toggle like for a post
  toggleLike(isLiked: boolean, postId: string): void {
    if (isLiked) {
      this.subscriptions.push(
        this.commentsService.unlikeComment(postId).subscribe({
          next: (data) => {
            const post = this.posts.find((post) => post._id === postId);
            if (post) {
              post.engagement.liked = false;
              post.actions.likes--;
            }
          },
        })
      );
    } else {
      this.subscriptions.push(
        this.commentsService.likeComment(postId).subscribe({
          next: (data) => {
            const post = this.posts.find((post) => post._id === postId);
            if (post) {
              post.engagement.liked = true;
              post.actions.likes++;
            }
          },
        })
      );
    }
  }

  newPostSuccess(postData: any) {
    this.posts.unshift(postData);
  }
}
