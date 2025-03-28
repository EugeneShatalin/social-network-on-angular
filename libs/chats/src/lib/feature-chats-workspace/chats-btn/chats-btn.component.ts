import {Component, inject, input} from '@angular/core';
import {AvatarCircleComponent} from '@tt/common-ui';
import {ChatService, LastMessageRes} from '../../data';
import {tap} from 'rxjs';



@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chatsService = inject(ChatService);

  message = 0

  constructor() {
    this.chatsService.wsAdapter.connect
  }

  chat = input<LastMessageRes>();
}
