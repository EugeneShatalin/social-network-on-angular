import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy, OnInit,
  Renderer2,
} from '@angular/core';
import {
  debounceTime,
 fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';
import {PostInputComponent} from '../../ui';
import { PostComponent } from '../post/post.component';
import {Store} from '@ngrx/store';
import {postsActions} from '../../data/store/actions';
import {selectAllPosts} from '../../data/store/selectors';


@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit, OnDestroy, OnInit {
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  #destroy = new Subject<void>();

  store = inject(Store)

  feed = this.store.selectSignal(selectAllPosts)

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {}

  ngOnInit() {
    console.log('ngOnInit');
    this.store.dispatch(postsActions.fetchPosts({}))
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(500), takeUntil(this.#destroy))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  ngOnDestroy() {
    this.#destroy.next();
    this.#destroy.complete();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
