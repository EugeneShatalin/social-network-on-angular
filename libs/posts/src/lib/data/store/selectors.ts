import {createSelector} from '@ngrx/store';
import {postsFeature} from './reducer';


export const selectAllPosts = createSelector(
  postsFeature.selectPosts,
  (posts) => posts
)
