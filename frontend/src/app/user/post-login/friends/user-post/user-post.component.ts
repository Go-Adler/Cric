import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { FriendsService } from '../friends.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { I_post } from 'src/app/models/responses/message.model';
import { Subscription } from 'rxjs';
import { UserPostService } from './user-post.service'

const POSTS_LIMIT = 6;

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnChanges, OnDestroy {
  posts: any[] = [];
  spinner = true;
  profilePicture = '';
  name = '';
  userName = '';
  postContent = '';
  fetchingPosts = false;
  skip = 0;
  postsEnd = false;
  posti = false;
  firstFetch = false;
  commentSection = false;
  postLoadingImage: string = '';

  private subscriptions: Subscription[] = [];

  @Input() newPost!: I_post;

  constructor(
    private friendsService: FriendsService,
    private router: Router,
    private userService: UserService,
    private userPostService: UserPostService,
  ) {}

  ngOnInit(): void {
    // Get name
    this.subscriptions.push(
      this.userService.name$.subscribe({
        next: (name) => {
          this.name = name;
        },
      })
    );

    // Get user name
    this.subscriptions.push(
      this.userService.userName$.subscribe((userName) => {
        this.userName = userName;
      })
    );

    // Get profile picture
    this.subscriptions.push(
      this.userService.profilePicture$.subscribe({
        next: (profilePicture) => {
          this.profilePicture = profilePicture;
        },
      })
    );

    this.postLoadingImage = this.userPostService.getPostLoadingImage();
    
    // Get posts
    this.subscriptions.push(
      this.userPostService.getPosts('ss', this.skip).subscribe({
        next: (data) => {
          this.spinner = false;
          this.firstFetch = true;
          this.posts = data.posts;
        },
        error: (error) => {
          console.error(error);
          this.spinner = false;
        },
      })
    );
  }

  // Navigate to post
  navigateToPost(postId: string): void {
    this.router.navigate(['/user/post', postId]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['newPost'].firstChange) {
      this.posts.unshift(changes['newPost'].currentValue);
    }
  }

  // Load more posts
  loadMore(): void {
    this.fetchingPosts = true;
    this.skip += POSTS_LIMIT;
    this.subscriptions.push(
      this.userPostService.getPosts('', this.skip).subscribe({
        next: (data) => {
          this.fetchingPosts = false;
          const postExists = data.posts[0];
          if (postExists) {
            this.posts = [...this.posts, ...data.posts];
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

  // Select a post
  selectedPost(postId: string): void {
    this.posti = true;
  }

  // Toggle like for a post
  toggleLike(isLiked: boolean, postId: string): void {
    if (isLiked) {
      this.subscriptions.push(
        this.userPostService.unlikePost(postId).subscribe({
          next: (data) => {
            const post = this.posts.find((post) => post._id === postId);
            if (post) {
              post.engagement.liked = false;
              post.actions.likes--;
            }
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
    } else {
      this.subscriptions.push(
        this.userPostService.likePost(postId).subscribe({
          next: (data) => {
            const post = this.posts.find((post) => post._id === postId);
            if (post) {
              post.engagement.liked = true;
              post.actions.likes++;
            }
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}