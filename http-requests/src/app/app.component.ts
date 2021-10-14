import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";

import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  firebaseUrl: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.firebaseUrl = `${environment.fireBaseUrl}/posts.json`;
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http.post<{ name: string }>(this.firebaseUrl, postData).subscribe(
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
    console.log(this.loadedPosts);
    this.http.get<{ [key: string]: Post }>(this.firebaseUrl)
      .pipe(map((responseData) => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key))
            postArray.push({...responseData[key], id: key});
        }
        return postArray;
      }))
      .subscribe(posts => {
        console.log(posts);
        this.loadedPosts = posts;
      });
  }
}
