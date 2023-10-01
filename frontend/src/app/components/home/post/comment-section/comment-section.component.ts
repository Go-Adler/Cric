import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  @Input() posts!: any[]
  @Input() userName!: string
  @Input() name!: string
  @Input() profilePicture!: string

  toggleLike(i: string, b: string) {
    
  }

}
