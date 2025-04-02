import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from '../../ui/profile-card/profile-card.component';
import {ProfileFiltersComponent} from '../profile-filters/profile-filters.component';
import {AsyncPipe} from '@angular/common';
import {profileActions, selectFilteredProfiles} from '@tt/profile';
import {Store} from '@ngrx/store';
import {InfiniteScrollTriggerComponent} from '@tt/common-ui';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe, InfiniteScrollTriggerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles)
  //чтоб консоль была доступна в HTML шаблоне
  console = console

  constructor() {
  }

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }
}
