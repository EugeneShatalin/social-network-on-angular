import {Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {canActivteAuth} from './auth/access.guard';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {chatsRoutes} from './pages/chats-page/chatsRoutes';
import {FormsExperimentComponent} from './experimental/forms-experiment/forms-experiment.component';

export const routes: Routes = [
  {
    //LayoutComponent содержит в себе сайдбар и место дляч отображения содержимого различныхстраниц с сайдбаром,
    // так как он общий для все страниц, этот метоб позваляет перерисовывать только содержимое самих страниц
    //не затрагивая сам сайдбар
    path: '', component: LayoutComponent, children: [
      //перечень страниц с сайдбаром
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'profile/:id', component: ProfilePageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'search', component: SearchPageComponent},
      {
        path: 'chats',
        loadChildren: () => chatsRoutes
      },
    ],
    //все выше стоящии пути защищены гардом canActivate, который принимает в себя нами написаный гард,
    // который, если пользователь не авторезирован,перенапрвляет на страницу авторизации
    //защитили данный раздел роутов гардом access.guard.ts
    canActivate: [canActivteAuth]
  },
  {path: 'profile', component: ProfilePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'forms-experiment', component: FormsExperimentComponent},
];
