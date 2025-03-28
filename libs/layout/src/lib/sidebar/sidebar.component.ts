import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';

import {firstValueFrom} from 'rxjs';
import {ProfileService} from '@tt/profile';
import {ChatService} from '@tt/chats';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatService = inject(ChatService);

  subscribers$ = this.profileService.getSubscribersShortList();

  unreadMessage = this.chatService.unreadMessage;
  me = this.profileService.me;

  constructor() {

  }

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];


  ngOnInit(): void {

    firstValueFrom(this.profileService.getMe());
  }
}
