import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/interfaces/post';
import { Urls } from '../../../core/urls/urls';
import { map } from 'rxjs/operators';
import { FbCreateResponse } from '../../../shared/interfaces/fb-create-response';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) {
  }

  public createPost(post: Post): Observable<Post> {
    const url = Urls.postUrl();
    return this.http.post(url, post)
      .pipe(
        map((res: FbCreateResponse) => {
          return {
            ...post,
            id: res.name,
            date: new Date(post.date)
          };
        })
      );
  }

  public getAllPosts(): Observable<Post[]> {
    const url = Urls.postUrl();
    return this.http.get(url)
      .pipe(
        map((res: { [key: string]: any }) => {
          const keyList = Object.keys(res);

          return keyList.map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
        })
      );
  }

  public getById(id: string): Observable<Post> {
    const url = Urls.getPostById(id);

    return this.http.get<Post>(url).pipe(
      map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        };
      })
    );
  }

  public deletePost(id: string): Observable<void> {
    const url = Urls.getPostById(id);
    return this.http.delete<void>(url);
  }

  public updatePost(post: Post): Observable<Post> {
    const url = Urls.getPostById(post.id);
    return this.http.patch<Post>(url, post);
  }
}
