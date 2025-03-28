import {Component, inject, Input} from '@angular/core';
import {ImgUrlPipe} from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  // старый синтаксис получения входных данных через декоратор @Input
  @Input() profile!: Profile;

  router = inject(Router);

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {queryParams: {userId}});
  }
}
