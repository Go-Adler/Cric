import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { FriendsService } from '../friends.service'
import { UserPostService } from './user-post.service'
import { environment } from 'src/environments/environment'
import { FriendStatus } from 'src/app/models/responses/userResponses'

const POSTS_LIMIT = 6

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnChanges, OnDestroy {
  skip = 0
  name = ''
  userName = ''
  posti = false
  spinner = true
  postContent = ''
  postsEnd = false
  posts: any[] = []
  firstFetch = false
  profilePicture = ''
  fetchingPosts = false
  commentSection = false
  friendStatus: FriendStatus = 'stranger'
  POSTS_PROTECTED = environment.POSTS_PROTECTED
  POST_LOADING_IMAGE = environment.POST_LOADING_IMAGE

  private subscriptions: Subscription[] = []

  constructor(
    private router: Router,
    private friendsService: FriendsService,
    private userPostService: UserPostService,
  ) { }

  ngOnInit(): void {
    // Get name
    this.subscriptions.push(
      this.friendsService.name$.subscribe({
        next: (name) => {
          this.name = name
        },
      })
    )

    // Get user name
    this.friendsService.userName$.subscribe({
      next: (userName) => {
        this.userName = userName
      },
    })

    this.subscriptions.push(
      this.friendsService.friendStatus$.subscribe({
        next: friendStatus => {
          this.friendStatus = friendStatus
          if (this.friendStatus === 'friend') {
            // Get posts
            this.userPostService.getPosts(this.skip, this.userName).subscribe({
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
          }
        }
      })
    )

    // Get profile picture
    this.subscriptions.push(
      this.friendsService.profilePicture$.subscribe({
        next: (profilePicture) => {
          this.profilePicture = profilePicture
        },
      })
    )


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
    this.subscriptions.push(
      this.userPostService.getPosts(this.skip, this.userName).subscribe({
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

  // Select a post
  selectedPost(postId: string): void {
    this.posti = true
  }

  // Toggle like for a post
  toggleLike(isLiked: boolean, postId: string): void {
    if (isLiked) {
      const post = this.posts.find((post) => post._id === postId)
      if (post) {
        post.engagement.liked = false
        post.actions.likes--
      }
      this.subscriptions.push(
        this.userPostService.unlikePost(postId).subscribe({
          error: () => {
            post.engagement.liked = true
            post.actions.likes++
          },
        })
      )
    } else {
      const post = this.posts.find((post) => post._id === postId)
      if (post) {
        post.engagement.liked = true
        post.actions.likes++
      }
      this.subscriptions.push(
        this.userPostService.likePost(postId).subscribe({
          error: () => {
            post.engagement.liked = false
            post.actions.likes--
          },
        })
      )
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
