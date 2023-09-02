import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor (private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const postId = +params['id'];
      console.log(postId, 15);
      
      // this.dataService.getPostById(postId).subscribe(post => {
      //   this.post = post;
      // });
    });
  }
}
