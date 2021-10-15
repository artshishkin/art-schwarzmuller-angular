import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, Subject, throwError} from "rxjs";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  firebaseUrl = `${environment.fireBaseUrl}/posts.json`;

  private errorSubject = new Subject<string>();
  error = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchPosts(): Observable<Post[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('print', 'pretty');
    httpParams = httpParams.append('foo', 'bar');
    return this.http.get<Map<string, Post>>(
      this.firebaseUrl,
      {
        headers: new HttpHeaders({'Custom-Header': 'BlaBlaHeaderValue'}),
        params: httpParams
      })
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key))
              postArray.push({...responseData[key], id: key});
          }
          return postArray;
        }),
        catchError(errorResponse => {
          // ...Send to Analytics Server
          // ...Push to error subject
          // ...then rethrow (may be custom exception/error)
          return throwError(errorResponse);
        })
      );
  }

  errorHandlingUsingSubjectTests(): void {
    this.http.get<Map<string, Post>>(`${environment.fireBaseUrl}/absent.json`)
      .subscribe(posts => console.log(posts),
        error => {
          this.errorSubject.next(error.message);
          console.log(error);
        });
  }

  createAndStorePost(title: string, content: string): Observable<HttpResponse<any>> {
    const postData: Post = {title: title, content: content};
    return this.http.post<{ name: string }>(
      this.firebaseUrl,
      postData,
      {
        observe: "response"
      }
    );
  }

  deleteAllPosts(): Observable<any> {
    return this.http.delete(
      this.firebaseUrl,
      {
        observe: "events",
        responseType: "text" //"json"(default),"blob","text","arraybuffer"
      })
      .pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log('Request Sent');
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }));
  }

}
