import {AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../data/services/post.service';
import {debounceTime, firstValueFrom, fromEvent, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit, OnDestroy {
  postService = inject(PostService)
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  #destroy=new Subject<void>();

  feed = this.postService.posts

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed()
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts())
  }

  ngAfterViewInit() {
    this.resizeFeed()

    fromEvent(window, 'resize')
      .pipe(debounceTime(500), takeUntil(this.#destroy))
      .subscribe(() => {
        this.resizeFeed()
      })
  }

  ngOnDestroy() {
    this.#destroy.next()
    this.#destroy.complete()
  }


  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

}
