import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  newPostData: any
  constructor(private router: Router) {}

  newPostSuccess(postData: any) {
    this.newPostData = postData
  }
}
