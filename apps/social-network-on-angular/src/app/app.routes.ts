import {Routes} from '@angular/router';
import {FormsExperimentComponent} from './experimental/forms-experiment/forms-experiment.component';
import {canActivteAuth, LoginPageComponent} from '@tt/auth';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent
} from '@tt/profile';

import {chatsRoutes} from '@tt/chats';
import {LayoutComponent} from '@tt/layout';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {postsFeature} from '../../../../libs/posts/src/lib/data/store/reducer';
import {PostsEffects} from '../../../../libs/posts/src/lib/data/store/effects';


export const routes: Routes = [
  {
    //LayoutComponent содержит в себе сайдбар и место дляч отображения содержимого различныхстраниц с сайдбаром,
    // так как он общий для все страниц, этот метоб позваляет перерисовывать только содержимое самих страниц
    //не затрагивая сам сайдбар
    path: '',
    component: LayoutComponent,
    children: [
      //перечень страниц с сайдбаром
      {path: '', redirectTo: 'profile/me', pathMatch: 'full',},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    //все выше стоящии пути защищены гардом canActivate, который принимает в себя нами написаный гард,
    // который, если пользователь не авторезирован,перенапрвляет на страницу авторизации
    //защитили данный раздел роутов гардом access.guard.ts
    canActivate: [canActivteAuth],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    providers: [
      provideState(postsFeature),
      provideEffects(PostsEffects)
    ]
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'forms-experiment', component: FormsExperimentComponent},
];
