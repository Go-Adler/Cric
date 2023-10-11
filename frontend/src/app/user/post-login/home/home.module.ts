import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NewPostComponent } from './new-post/new-post.component'
import { PostComponent } from './post/post.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { TimeagoModule } from 'ngx-timeago'
import { CommentSectionComponent } from './post/comment-section/comment-section.component'
import { NewCommentComponent } from './post/comment-section/new-comment/new-comment.component'
import { HomeRoutingModule } from './home-routing.module'
import { FeedComponent } from './feed/feed.component'



@NgModule({
  declarations: [
    HomeComponent,
    NewPostComponent,
    PostComponent,
    CommentSectionComponent,
    NewCommentComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    TimeagoModule.forRoot(),
    HomeRoutingModule
  ]
})
export class HomeModule { }
