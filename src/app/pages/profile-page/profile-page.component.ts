import {Component, inject, signal} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {firstValueFrom, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe, NgForOf} from '@angular/common';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {SubscriberCardComponent} from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {PostFeedComponent} from './post-feed/post-feed.component';
import {ChatService} from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    NgForOf,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  chatsService = inject(ChatService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  //вынесли me в отдельную переменную и приобразовали в обсервабал, чтоб соблюсти инжекшен контест
  $me = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(5)

  isMyPage = signal(false)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
        if (id === 'me') return this.$me

        return this.profileService.getAccount(id)
      })
    )

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId))
      .then((res) => {
        this.router.navigate(['/chats', res.id])
      })

  }
}
