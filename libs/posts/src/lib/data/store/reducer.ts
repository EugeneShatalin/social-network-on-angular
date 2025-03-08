import {createFeature, createReducer, on} from '@ngrx/store';

import {CommentCreateDto, Post} from '../interfaces/post.interface';
import {postsActions} from './actions';

export interface ProfileState {
  posts: Post[],
  comments: CommentCreateDto[]
}

export const initialState: ProfileState = {
  posts: [],
  comments: []
}

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialState,

    on(postsActions.loadedPosts, (state, {posts}) => ({
        ...state,
        posts
    }))

  )
})
