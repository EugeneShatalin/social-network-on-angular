import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, of, switchMap} from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { MessageInputComponent } from '../../ui';
import { ChatService } from '../../data/services/chats.service';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router)
  chatsService = inject(ChatService);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if(id === 'new') {
        return this.route.queryParams.pipe(
          switchMap(({userId}) => {
            //создаем новый чат
            return this.chatsService.createChat(userId).pipe(
              // @ts-ignore
              filter(({userId}) => userId),
              switchMap(chat => {
                //перенаправляем на страницу с созданым чатом
                this.router.navigate(['chats', chat.id])
                return of(null)
              })
            );
          })
        )
      }

      return this.chatsService.getChatById(id)
    })
  );
}
