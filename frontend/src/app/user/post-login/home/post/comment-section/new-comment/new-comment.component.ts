import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from './new-comment.service';
import { I_post } from 'src/app/models/responses/message.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  // Form group for the post
  postForm!: FormGroup;

  // Flags to track the state of the post
  isPosting: boolean = false;
  postSuccess: boolean = false;

  // User's profile picture and name
  profilePicture: string = '';
  name: string = '';

  // Selected image for the post
  selectedImage: string | ArrayBuffer | null | undefined = null;

  // File for the post image
  postImage!: File | null;

  // Flags and message for failed post
  postFailed: boolean = false;
  isPostFailedMessage: boolean = true;
  postFailedMessage: string = '';

  // Event emitter for new posts
  @Output() newPostEvent = new EventEmitter<I_post>();

  //  Post id  for the comment
  @Input() postId!: string;

  // Reference to the file input element
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Fetch user's basic info and profile picture, and initialize the form
    this.userService.getUserBasicInfo();
    this.userService.profilePicture$.subscribe({
      next: (profilePicture) => {
        this.profilePicture = profilePicture;
      },
    });
    this.userService.name$.subscribe({
      next: (name) => {
        this.name = name;
      },
    });
    this.postForm = this.fb.group({
      text: ['', [Validators.maxLength(300), Validators.required]],
      image: '',
    });
  }

  // Function to handle form submission
  onSubmit() {
    this.isPosting = true;
    const image = this.postForm.get('image')?.value;
    let text = this.postForm.get('text')?.value;

    if (text === '') text = ' ';

    const formData = new FormData();

    formData.append('postId', this.postId);
    formData.append('text', text);
    formData.append('postImage', image);

    this.commentService.newComment(formData).subscribe({
      next: (response) => {
        this.isPosting = false;

        if (response.uploadFailed) {
          if (response.message) {
            this.postFailedMessage = response.message;
            this.isPostFailedMessage = true;
            setTimeout(() => {
              this.isPostFailedMessage = false;
            }, 2000);
            return;
          }
          this.postFailed = true;

          setTimeout(() => {
            this.postFailed = false;
          }, 2000);
          return;
        }

        this.postSuccess = true;
        this.postForm.reset();
        this.selectedImage = null;
        this.newPostEvent.emit(response.post);

        setTimeout(() => {
          this.postSuccess = false;
        }, 2000);
      },
    });
  }

  // Function to handle image selection
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

  // Function to handle closing of image
  onCloseImage() {
    this.fileInput.nativeElement.value = '';
    this.selectedImage = null;
    this.postForm.get('image')?.setValue(null);
  }

  // Function to handle click on input
  clickInput() {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }
}
