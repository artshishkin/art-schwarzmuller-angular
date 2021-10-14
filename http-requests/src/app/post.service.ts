import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Subject} from "rxjs";
import {Post} from "./post.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  firebaseUrl = `${environment.fireBaseUrl}/posts.json`;
  private loadedPostsSubject = new Subject<Post[]>();
  loadedPostsObservable = this.loadedPostsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchPosts(): void {
    this.http.get<Map<string, Post>>(this.firebaseUrl)
      .pipe(map((responseData) => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key))
            postArray.push({...responseData[key], id: key});
        }
        return postArray;
      }))
      .subscribe(posts => {
          this.loadedPostsSubject.next(posts);
        },
        error => {
          console.log(error);
        });
  }

  createAndStorePost(title: string, content: string): void {
    const postData: Post = {title: title, content: content};
    this.http.post<{ name: string }>(this.firebaseUrl, postData)
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      ); //no need to manage subscription - Angular creates it and will manage it;
  }

}
