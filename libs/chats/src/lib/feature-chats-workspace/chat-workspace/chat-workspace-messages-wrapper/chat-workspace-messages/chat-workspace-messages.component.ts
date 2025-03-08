import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  signal,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import {AvatarCircleComponent} from '@tt/common-ui';
import { Message } from 'libs/chats/src/lib/data';

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
