import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Post} from "./post.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  firebaseUrl = `${environment.fireBaseUrl}/posts.json`;

  constructor(private http: HttpClient) {
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Map<string, Post>>(this.firebaseUrl)
      .pipe(map((responseData) => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key))
            postArray.push({...responseData[key], id: key});
        }
        return postArray;
      }));
  }

  createAndStorePost(title: string, content: string): Observable<{ name: string }> {
    const postData: Post = {title: title, content: content};
    return this.http.post<{ name: string }>(this.firebaseUrl, postData);
  }

  deleteAllPosts():Observable<any> {
    return this.http.delete(this.firebaseUrl);
  }

}
