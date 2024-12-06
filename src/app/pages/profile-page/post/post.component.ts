import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PostComment, Post} from '../../../data/interfaces/post.interface';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {SomeTimeAgoPipe} from '../../../helpers/pipes/some-time-ago';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    SomeTimeAgoPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  post = input<Post>()
  comments = signal<PostComment[]>([])
  postService = inject(PostService)

  constructor() {

  }


  async ngOnInit() {
    this.comments.set(this.post()!.comments)
    if(this.post()?.createdAt) {
     const string = String(this.post()?.createdAt)
      console.log(Date.parse(string))
    }

  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comments.set(comments)
  }

}
