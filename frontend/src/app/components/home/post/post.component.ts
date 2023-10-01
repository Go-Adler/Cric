import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { PostService } from '../home.post.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { I_post } from 'src/app/models/responses/message.model';
import { Subscription } from 'rxjs';

const POSTS_LIMIT = 6;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnChanges, OnDestroy {
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

  private subscriptions: Subscription[] = [];

  @Input() newPost!: I_post;

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Get profile picture
    this.subscriptions.push(this.userService.profilePicture$.subscribe(profilePicture => {
      this.profilePicture = profilePicture;
    }));

    // Get name
    this.subscriptions.push(this.userService.name$.subscribe(name => {
      this.name = name;
    }));

    // Get user name
    this.subscriptions.push(this.userService.userName$.subscribe(userName => {
      this.userName = userName;
    }));

    // Get posts
    this.subscriptions.push(this.postService.getPosts(this.skip).subscribe((data) => {
      this.spinner = false;
      this.firstFetch = true;
      this.posts = data.posts;
    }, error => {
      console.error(error);
      this.spinner = false;
    }));
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
    this.subscriptions.push(this.postService.getPosts(this.skip).subscribe((data) => {
      this.fetchingPosts = false;
      const postExists = data.posts[0];
      if (postExists) {
        this.posts = [...this.posts, ...data.posts];
      } else {
        this.postsEnd = true;
      }
    }, error => {
      console.error(error);
      this.fetchingPosts = false;
    }));
  }

  // Select a post
  selectedPost(postId: string): void {
    this.posti = true;
  }

  // Toggle like for a post
  toggleLike(isLiked: boolean, postId: string): void {
    this.subscriptions.push(this.postService.likePost(postId).subscribe(data => {
      console.log(data);
    }, error => {
      console.error(error);
    }))
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
