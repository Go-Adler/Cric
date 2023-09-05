import { Component } from '@angular/core';
import { PostService } from '../home.post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  posts: any;
  spinner: boolean = true;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.spinner = false;
      this.posts = data.posts;
    });
  }

  navigateToPost(postId: string) {
    this.router.navigate(['/user/post', postId]);
  }
}
