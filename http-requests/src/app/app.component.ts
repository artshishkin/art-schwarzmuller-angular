import {Component, OnDestroy, OnInit} from '@angular/core';

import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];

  isFetching = false;

  subs: Subscription[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    const subscription = this.postService.loadedPostsObservable
      .subscribe(posts => this.loadedPosts = posts);
    this.subs.push(subscription);
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    // this.isFetching = true;
    this.postService.fetchPosts();
  }
}
