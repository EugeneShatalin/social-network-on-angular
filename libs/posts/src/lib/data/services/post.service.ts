import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDto,
  Post,
  PostCreateDto,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // # - в начале переменной делает её приватной на уровне нативного JS
  #http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

 // posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    console.log('createPost service', payload);
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<Comment>(`${this.baseApiUrl}comment/`, payload)
  }

  fetchPosts() {
    return this.#http.get<Post[]>(`${this.baseApiUrl}post/`);
      //.pipe(tap((res) => this.posts.set(res)));
  }



  getCommentsByPostId(postId: number) {
    return this.#http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
