import { Component } from '@angular/core';
import { PostService } from '../home.post.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  posts: any;
  spinner: boolean = true;
  profilePicture: string = ''
  name: string = ''


  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    // get profile picture
    this.userService.profilePicture$.subscribe(profilePicture => {
      this.profilePicture = profilePicture
    })

    // get name
    this.userService.name$.subscribe( name => {
      this.name = name
    })
    this.postService.getPosts().subscribe((data) => {
      this.spinner = false;
      this.posts = data.posts;
    });
  }

  navigateToPost(postId: string) {
    this.router.navigate(['/user/post', postId]);
  }
}
