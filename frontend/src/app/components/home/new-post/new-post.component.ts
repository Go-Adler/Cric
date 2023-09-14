import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NewPostService } from './new-post.service';
import { UserService } from 'src/app/services/user.service'
import { SuccessPost } from 'src/app/models/post.model'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup;
  isPosting: boolean = false;
  postSuccess: boolean = false;
  profilePicture: string = ''
  name: string = ''

  @Output() newPostEvent = new EventEmitter<SuccessPost>();

  constructor(
    private fb: FormBuilder,
    private newPostService: NewPostService,
    private userService: UserService
    
  ) {}

  ngOnInit(): void {
    this.userService.getUserBasicInfo()  // remove later - helpful for development gokul

    // fetch profile picture
    this.userService.profilePicture$.subscribe( profilePicture => {
      this.profilePicture = profilePicture
    })

    // fetch user name
    this.userService.name$.subscribe( name => {
      this.name = name
    })
    this.postForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    this.isPosting = true;
    const postData = this.postForm.value;

    this.newPostService.newPost(postData).subscribe((response) => {
      this.isPosting = false;
      this.postSuccess = true;
      this.postForm.reset();
      this.newPostEvent.emit(response.postData)

      setTimeout(() => {
        this.postSuccess = false;
      }, 2000);
    });
  }
}
