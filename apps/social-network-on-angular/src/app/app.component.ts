import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from '../../../../libs/profile/src/lib/ui/profile-card/profile-card.component';
import { JsonPipe } from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ChatService} from '@tt/chats';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
 // #chatService = inject(ChatService);
  constructor() {
   /* this.#chatService.connectWs()
      .pipe(takeUntilDestroyed())
      .subscribe()*/
  }
}
