import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {authTokenInterceptor} from '@tt/auth';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {PostsEffects} from '../../../../libs/posts/src/lib/data/store/effects';
import {postsFeature} from '../../../../libs/posts/src/lib/data/store/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    //withInterceptors([authTokenInterceptor], здесь добавили наш интерсепкор, который будет пропускать через себя каждый
    //запрос и  добавлять к нему токен авторизации, если токен будет отсутствовать, запрос на сервер не пройдет
    provideHttpClient(withInterceptors([authTokenInterceptor])), //withInterceptors([authTokenInterceptor]
    provideStore(), //подключили к проекту NgRx
    provideState(postsFeature),
    provideEffects(PostsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ],
};
