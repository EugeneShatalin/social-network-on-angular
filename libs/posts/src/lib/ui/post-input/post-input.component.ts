import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';

import {AvatarCircleComponent, SvgIconComponent} from '@tt/common-ui';

import {GlobalStoreService} from '@tt/shared';
import {PostService} from '../../data/services/post.service';
import {Store} from '@ngrx/store';
import {postsActions} from '../../data/store/actions';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  postService = inject(PostService);

  isCommentInput = input(false);
  postId = input<number>(0);

  profile = inject(GlobalStoreService).me;

  store = inject(Store)

  @Output() createdPost = new EventEmitter<{ content: string, authorId: number}>();
  @Output() createdCommit = new EventEmitter<{text: string, authorId: number,  postId: number}>();

  //если это ввод комментария, то вешаем класс comment
  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }
  postText: string = '';

  //функци, в которой с помощью встроенной в ангуляр библиотеки Renderer2, делаем чтоб высота
  // блока textarea менялась по высоту текста без появления прокрутки
  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    console.log('onCreatePost post-input')
    if (!this.postText) return;
    if (this.isCommentInput()) {
      console.log('creat commit')
      this.createdCommit.emit({text: this.postText, authorId: this.profile()!.id,  postId: this.postId()});
      this.postText = '';
      return;
    }
    console.log('creat post')
    this.createdPost.emit({content: this.postText, authorId: this.profile()!.id});
    this.postText = '';
  }
}
