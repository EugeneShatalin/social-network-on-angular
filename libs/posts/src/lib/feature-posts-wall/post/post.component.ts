import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import {CommentComponent, PostInputComponent} from '../../ui';
import {Post, PostComment, PostService} from '../../data';
import {AvatarCircleComponent, SomeTimeAgoPipe, SvgIconComponent} from '@tt/common-ui';
import {postsActions} from '../../data/store/actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    SomeTimeAgoPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input<Post>();
  //comments = signal<PostComment[]>([]);
  postService = inject(PostService);
  store = inject(Store)

  constructor() {}

 /* async ngOnInit() {
    this.comments.set(this.post()!.comments);
    if (this.post()?.createdAt) {
      const string = String(this.post()?.createdAt);
    }
  }*/

  /*async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    this.comments.set(comments);
  }*/

  onCreateComment(event: {text: string, authorId: number, postId: number}) {
    this.store.dispatch(postsActions.createComment({text: event.text, authorId: event.authorId, postId: event.postId}))
  }

}
