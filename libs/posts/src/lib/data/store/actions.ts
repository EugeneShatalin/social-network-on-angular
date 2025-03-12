import {createActionGroup, props} from '@ngrx/store';
import {Post, PostComment} from '../interfaces/post.interface';

export const postsActions = createActionGroup({
  source: 'post',
  events: {
    'create post': props<{content: string, authorId: number}>(),
    'fetch posts': props<{page?: number}>(),
    'loaded posts': props<{posts: Post[]}>(),
    'create comment': props<{text: string, authorId: number, postId: number}>(),
    'comments loaded': props<{postId: number, comments: PostComment[]}>()
  }
})
