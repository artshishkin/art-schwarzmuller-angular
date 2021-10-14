import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../environments/environment";

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
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post(this.firebaseUrl, postData).subscribe(
      result => console.log(result),
      error => console.log(error)
    ); //no need to manage subscription - Angular creates it and will manage it
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
