import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewPostService } from './new-post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup;
  isPosting: boolean = false;
  postSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private newPostService: NewPostService
  ) {}

  ngOnInit(): void {
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

      setTimeout(() => {
        this.postSuccess = false;
      }, 2000);
    });
  }
}
