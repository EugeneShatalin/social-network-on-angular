import {Component, ElementRef, HostBinding, inject, input, signal} from '@angular/core';
import {Message} from '../../../../../data/interfaces/chats.interface';
import {AvatarCircleComponent} from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss'
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message>()

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine
  }
}
