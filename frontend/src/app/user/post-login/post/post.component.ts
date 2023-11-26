import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostService } from './post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  postId: string | null
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ){
    this.postId = this.route.snapshot.paramMap.get('id')
  }
  ngOnInit() {
    if (this.postId) {
     this.postService.getPost(this.postId).subscribe({
      next: data => {
        console.log(data, 22);
      }
     })
    }
  }
}
