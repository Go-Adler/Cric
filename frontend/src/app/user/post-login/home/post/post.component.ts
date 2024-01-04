import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { PostService } from '../home.service'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { I_post } from 'src/app/models/responses/message.model'
import { environment } from 'src/environments/environment'

const POSTS_LIMIT = 6

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  name = ''
  skip = 0
  posti = false
  userName = ''
  spinner = true
  postsEnd = false
  sameUser = false
  postContent = ''
  posts: any[] = []
  firstFetch = false
  profilePicture = ''
  fetchingPosts = false
  emptyPostIcon: string
  commentSection = false
  postLoadingImage: string = ''
  errorLoading = environment.ERROR_LOADING

  private subscriptions: Subscription[] = [];

  @Input() newPost!: I_post

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {
    this.emptyPostIcon = environment.EMPTY_POST
  }

  ngOnInit(): void {
    this.userService.getUserBasicInfo()

    // Get name
    this.subscriptions.push(
      this.userService.name$.subscribe({
        next: (name) => {
          this.name = name
        },
      })
    )

    // Get user name
    this.subscriptions.push(
      this.userService.userName$.subscribe((userName) => {
        this.userName = userName
      })
    )

    // Get profile picture
    this.subscriptions.push(
      this.userService.profilePicture$.subscribe({
        next: (profilePicture) => {
          this.profilePicture = profilePicture
        },
      })
    )

    this.postLoadingImage = this.postService.getPostLoadingImage()

    // Get posts
    if (this.router.url === '/profile/posts') {
      this.sameUser = true
      this.subscriptions.push(
        this.postService.getPosts(this.skip).subscribe({
          next: (data) => {
            this.spinner = false
            this.firstFetch = true
            this.posts = data.posts
          },
          error: (error) => {
            console.error(error)
            this.spinner = false
          },
        })
      )
    } else {
      this.sameUser = false
      this.subscriptions.push(
        this.postService.getFeedPosts(this.skip).subscribe({
          next: (data) => {
            this.spinner = false
            this.firstFetch = true
            this.posts = data.posts
          },
          error: (error) => {
            console.error(error)
            this.spinner = false
          },
        })
      )
    }
  }

  // Navigate to post
  navigateToPost(postId: string): void {
    this.router.navigate(['/user/post', postId])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['newPost'].firstChange) {
      this.posts.unshift(changes['newPost'].currentValue)
    }
  }

  // Load more posts
  loadMore(): void {
    this.fetchingPosts = true
    this.skip += POSTS_LIMIT

    if (this.router.url === '/profile/posts') {
      this.subscriptions.push(
        this.postService.getPosts(this.skip).subscribe({
          next: (data) => {
            this.fetchingPosts = false
            const postExists = data.posts[0]
            if (postExists) {
              this.posts = [...this.posts, ...data.posts]
            } else {
              this.postsEnd = true
            }
          },
          error: (error) => {
            console.error(error)
            this.fetchingPosts = false
          },
        })
      )
    } else {
      this.subscriptions.push(
        this.postService.getFeedPosts(this.skip).subscribe({
          next: (data) => {
            this.fetchingPosts = false
            const postExists = data.posts[0]
            if (postExists) {
              this.posts = [...this.posts, ...data.posts]
            } else {
              this.postsEnd = true
            }
          },
          error: (error) => {
            console.error(error)
            this.fetchingPosts = false
          },
        })
      )
    }
    
  }

  // Select a post
  selectedPost(postId: string): void {
    this.posti = true
  }

  // Toggle like for a post
  toggleLike(isLiked: boolean, postId: string): void {
    const post = this.posts.find((post) => post._id === postId)
    if (isLiked) {
      if (post) {
        post.engagement.liked = false
        post.actions.likes--
      }
      this.subscriptions.push(
        this.postService.unlikePost(postId).subscribe({
          error: (error) => {
            post.engagement.liked = true
            post.actions.likes++
          },
        })
      )
    } else {
      post.engagement.liked = true
      post.actions.likes++
      this.subscriptions.push(
        this.postService.likePost(postId).subscribe({
          error: (error) => {
            post.engagement.liked = false
            post.actions.likes--
            console.error(error)
          },
        })
      )
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }


  toggleBookMark(isBookmarked: boolean, postId: string): void {
    
    const post = this.posts.find((post) => post._id === postId)
    if (isBookmarked) {
      post.engagement.bookmarked = false
      post.actions.bookmarks--
      this.postService.removeBookmark(postId).subscribe({
      })
    } else {
      post.engagement.bookmarked = true
      if (!post.actions.bookmarks)post.actions.bookmarks = 0
      post.actions.bookmarks++
      this.postService.bookmark(postId).subscribe({

      })
    }
  }
  handleImageError(event: any) {
    console.log('lazy loading image error')
  }
}
