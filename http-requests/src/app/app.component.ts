import {Component, OnInit} from '@angular/core';

import {Post} from "./post.model";
import {PostService} from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  isFetching = false;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createPost(postData).subscribe(
      result => console.log(result),
      error => console.log(error)
    ); //no need to manage subscription - Angular creates it and will manage it
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {

    this.isFetching = true;

    this.postService.fetchPosts()
      .subscribe(posts => {
          this.loadedPosts = posts;
          this.isFetching = false;
        },
        error => {
          console.log(error);
          this.isFetching = false;
        });
  }
}
