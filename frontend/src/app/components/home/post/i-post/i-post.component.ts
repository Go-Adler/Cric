import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-i-post',
  templateUrl: './i-post.component.html',
  styleUrls: ['./i-post.component.scss']
})
export class IPostComponent {
  profilePicture: string = ''
  name: string = ''
  userName: string = ''

  @Input() postData = ''
}
