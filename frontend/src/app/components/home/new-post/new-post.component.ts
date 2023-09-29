import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NewPostService } from './new-post.service';
import { UserService } from 'src/app/services/user.service'
import { I_post } from 'src/app/models/responses/message.model'

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
  selectedImage: string | ArrayBuffer | null | undefined = null;
  postImage!: File
  postFailed: boolean = false
  isPostFailedMessage: boolean = true
  postFailedMessage: string = ''

  @Output() newPostEvent = new EventEmitter<I_post>();

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
      text: ['', [ Validators.maxLength(300), Validators.required]],
      image: ''
    });
  }

  onSubmit() {
    this.isPosting = true;
    const image = this.postForm.get('image')?.value
    const text = this.postForm.get('text')?.value


    

    const formData = new FormData()

    formData.append('text', text)
    formData.append('postImage', image)

    this.newPostService.newPost(formData).subscribe((response) => {
      this.isPosting = false;

      if (response.uploadFailed) {
        if (response.message) {
          this.postFailedMessage = response.message
          this.isPostFailedMessage = true
          setTimeout(() => {
            this.isPostFailedMessage = false
          }, 2000);
          return
        }
        this.postFailed = true

        setTimeout(() => {
          this.postFailed = false
        }, 2000);
        return
      }
      
      this.postSuccess = true
      this.postForm.reset();
      this.selectedImage = null
      this.newPostEvent.emit(response.post)

      setTimeout(() => {
        this.postSuccess = false;
      }, 2000);
    });
  }

  onImageSelected(event: any) {
    
    if (event.target.files.length > 0) {
      this.postImage = event.target.files[0];
      this.postForm.get('image')?.setValue(this.postImage);
    }

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCloseImage() {
    this.selectedImage = null
    this.postForm.get('image')?.setValue(null);
  }
}