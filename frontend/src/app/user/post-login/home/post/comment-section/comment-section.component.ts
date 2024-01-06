import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { CommentService } from './new-comment/new-comment.service'
import { UserService } from 'src/app/services/user.service'

const POSTS_LIMIT = 6

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
  profilePicture!: string
  userName!: string
  name!: string

  @Input() postId!: string

  newPostData: any

  constructor(
    private userService: UserService,
    private commentsService: CommentService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.commentsService.getComments(this.skip, this.postId).subscribe({
        next: (data) => {
          this.spinner = false
          this.firstFetch = true
          this.posts = data.comments
        },
        error: (error) => {
          console.error(error)
          this.spinner = false
        },
      })
    )

    this.userService.name$.subscribe({ next: name => this.name = name })
    this.userService.userName$.subscribe({ next: userName => this.userName = userName })
    this.userService.profilePicture$.subscribe({ next: profilePicture => this.profilePicture = profilePicture })
  }

  // Load more posts
  loadMore(): void {
    this.fetchingPosts = true
    this.skip += POSTS_LIMIT
    this.subscriptions.push(
      this.commentsService.getComments(this.skip, this.postId).subscribe({
        next: (data) => {
          this.fetchingPosts = false
          const postExists = data.comments[0]
          if (postExists) {
            this.posts = [...this.posts, ...data.comments]
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

  // Toggle like for a post
  toggleLike(isLiked: boolean, postId: string): void {
    if (isLiked) {
      this.subscriptions.push(
        this.commentsService.unlikeComment(postId).subscribe({
          next: (data) => {
            const post = this.posts.find((post) => post._id === postId)
            if (post) {
              post.engagement.liked = false
              post.actions.likes--
            }
          },
        })
      )
    } else {
      this.subscriptions.push(
        this.commentsService.likeComment(postId).subscribe({
          next: (data) => {
            const post = this.posts.find((post) => post._id === postId)
            if (post) {
              post.engagement.liked = true
              post.actions.likes++
            }
          },
        })
      )
    }
  }



  newPostSuccess(postData: any) {
    const personDetails = {
      name: this.name,
      userName: this.userName,
      profilePicture: this.profilePicture
    }
    postData.personDetails = personDetails
    this.posts.unshift(postData)
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
