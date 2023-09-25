import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PostService } from '../home.post.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'
import { I_post } from 'src/app/models/responses/message.model'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class  PostComponent implements OnChanges{
  posts: any[] = [];
  spinner: boolean = true;
  profilePicture: string = ''
  name: string = ''
  userName: string = ''
  postContent: string = ''
  fetchingPosts: boolean = false
  skip: number = 0
  postsEnd: boolean = false
  posti: boolean = false

  @Input() newPost!: I_post

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

    // get user name
    this.userService.userName$.subscribe( userName => {
      this.userName = userName
    })
    
    // get posts
    this.postService.getPosts(this.skip).subscribe((data) => {
      this.spinner = false;
      this.posts = data.posts;
    });
  }

  navigateToPost(postId: string) {
    this.router.navigate(['/user/post', postId]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['newPost'].firstChange) {
      this.posts.unshift(changes['newPost'].currentValue)
    }
  }

  loadMore() {
    this.fetchingPosts = true
    this.skip += 6
    this.postService.getPosts(this.skip).subscribe((data) => {
      this.fetchingPosts = false;
      const postExists = data.posts[0]
      if (postExists) this.posts = [...this.posts, ...data.posts]
      else this.postsEnd = true
    });
  }

  selectedPost(postId:  string) {
    this.posti = true
  }

  likePost() {
    
  }
}
