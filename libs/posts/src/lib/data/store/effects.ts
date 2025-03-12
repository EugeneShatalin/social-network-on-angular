import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs';
import {PostService} from '@tt/posts';
import {postsActions} from './actions';
import {Store} from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class PostsEffects {
  postService = inject(PostService);
  actions$ = inject(Actions)
  store = inject(Store)

  postLoaded = createEffect(() => {
    return this.actions$.pipe(
      //ofType отслеживает каккой экшен произошел и пропускает выполнение кода дальше
      // если указанный в его параметраш экшен совпадает с произошедшим
      ofType(postsActions.fetchPosts),
      switchMap(() =>
        this.postService.fetchPosts().pipe(
          map((posts) => postsActions.loadedPosts({posts}))
        ))
    )
  })

  // @ts-ignore
  createPost = createEffect(() => {
    return this.actions$.pipe(
      //ofType отслеживает каккой экшен произошел и пропускает выполнение кода дальше
      // если указанный в его параметраш экшен совпадает с произошедшим
      ofType(postsActions.createPost),
      switchMap(({content, authorId}) =>
        this.postService.createPost({
          title: 'Клёвый пост',
          content: content,
          authorId: authorId
        })
      )
    )
  })

  // @ts-ignore
  createComment = createEffect(() => {
    return this.actions$.pipe(
      //ofType отслеживает каккой экшен произошел и пропускает выполнение кода дальше
      // если указанный в его параметраш экшен совпадает с произошедшим
      ofType(postsActions.createComment),
      switchMap(({ text, authorId, postId}) =>
        this.postService.createComment({
          text: text,
          authorId: authorId,
          postId: postId
        }).pipe(
          tap(() => {this.store.dispatch(postsActions.fetchPosts({}))})
        )
      )
    )
  })
}
