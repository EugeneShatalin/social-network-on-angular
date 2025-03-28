import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ChatService} from '@tt/chats';
import {firstValueFrom, Subscription, timer} from 'rxjs';
import {AuthService} from '@tt/auth';
import {isErrorMessage} from '../../../../chats/src/lib/data/interfaces/type-guards';
import {ProfileService} from '@tt/profile';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  #chatService = inject(ChatService);
  destroyRef = inject(DestroyRef);
  profileService = inject(ProfileService);

  wsSubscribe!: Subscription

  async reconnect() {
    await firstValueFrom(this.profileService.getMe())
    await firstValueFrom(timer(2000))
    this.connectWs()
  }

  connectWs() {
    this.wsSubscribe = this.#chatService
      .connectWs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message) => {
        if (isErrorMessage(message)) {
          this.reconnect()
        }
      })
  }

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
    this.connectWs()
  }
}
