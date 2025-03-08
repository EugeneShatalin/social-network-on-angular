import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs';
import {Post, PostService} from '@tt/posts';
import {postsActions} from './actions';


@Injectable({
  providedIn: 'root'
})
export class PostsEffects {
  postService = inject(PostService);
  actions$ = inject(Actions)

  postLoaded = createEffect(() => {
    return this.actions$.pipe(
      //ofType отслеживает каккой экшен произошел и пропускает выполнение кода дальше
      // если указанный в его параметраш экшен совпадает с произошедшим
      ofType(postsActions.fetchPosts),
      switchMap(() =>
        this.postService.fetchPosts().pipe(
          tap((posts: Post[]) => {console.log(posts)}),
          map((posts) => postsActions.loadedPosts({posts}))
        ))
    )
  })
}
