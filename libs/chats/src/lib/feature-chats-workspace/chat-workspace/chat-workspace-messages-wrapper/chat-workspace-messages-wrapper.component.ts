import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import {
  debounceTime,
  firstValueFrom,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';
import { MessageInputComponent } from '../../../ui';
import {Chat, ChatService} from '../../../data';



@Component({
  selector: ' app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessagesComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatService);
  hostElement = inject(ElementRef);
  #destroy = new Subject<void>();
  r2 = inject(Renderer2);

  chat = input.required<Chat>();

  messages = this.chatsService.activeChatMessages;

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText)
    );

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(500), takeUntil(this.#destroy))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
