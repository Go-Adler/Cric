import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { PostService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  newPostData: any;
  constructor(
    private router: Router,
    private fService: UserProfileService,
    private s: PostService
  ) {}

  btClick() {
    console.log(15);
    this.s.likePost("lss").subscribe(s => {
      console.log(s);
      
    })
    this.fService.updateProfilePicture();
  }

  newPostSuccess(postData: any) {
    this.newPostData = postData;
  }
}
