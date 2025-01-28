import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //withInterceptors([authTokenInterceptor], здесь добавили наш интерсепкор, который будет пропускать через себя каждый
    //запрос и  добавлять к нему токен авторизации, если токен будет отсутствовать, запрос на сервер не пройдет
    provideHttpClient(withInterceptors([authTokenInterceptor])) //withInterceptors([authTokenInterceptor]
  ]
};
