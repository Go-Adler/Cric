import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../home.post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts: any;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data.posts
      }
    )
  }
}