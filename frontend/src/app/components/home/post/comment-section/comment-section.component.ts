import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  @Input() userName!: string
  @Input() name!: string
  @Input() profilePicture!: string
  @Input() postId!: string

  posts: any[]

  newPostData: any


  constructor() {
    this.posts = []
  }

  toggleLike(i: string, b: string) {
    this.posts = []
  }

  newPostSuccess(postData: any) {
    this.posts.unshift(postData)
  }
}
