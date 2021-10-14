import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('postForm') postForm: NgForm;

  loadedPosts: Post[] = [];

  isFetching = false;

  subs: Subscription[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onCreatePost(postData: Post) {
    // Send Http request
    const subscription = this.postService
      .createAndStorePost(postData.title, postData.content)
      .subscribe(
        result => {
          this.postForm.reset();
          this.fetchPosts();
        },
        error => console.log(error)
      );
    this.subs.push(subscription);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    const subscription = this.postService.deleteAllPosts()
      .subscribe(
        () => {
          this.loadedPosts = [];
          alert('All posts were cleared');
        },
        error => console.log(error)
      );
    this.subs.push(subscription);
  }

  private fetchPosts() {
    this.isFetching = true;
    const subscription = this.postService.fetchPosts()
      .subscribe(posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        error => {
          this.isFetching = false;
          console.log(error);
        });
    this.subs.push(subscription);
  }
}
