import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {AuthService} from '@tt/auth';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

/*интерсептор (в других фреймворках мидел веер) "что-то стоящее по середине - перехватчик запроса"
служет для передачи дополнительных данных с запросом в данном случае передаем данные о авторизации*/
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  //присваеваем данные токина из сервиса авторизации
  const authService = inject(AuthService);
  const token = authService.token;

  //если токена нет возвращаем не измененый запрос
  if (!token) return next(req);

  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }

  //возвращаем измененый запрос
  return next(addToken(req, token)).pipe(
    //отлавливаем ошибку если токен протух, на даном бэкенде это ошибка 403
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProceed(authService, req, next);
      }
      //если ошибка другаю, возвращаем ее обратно в поток
      return throwError(error);
    })
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        return next(addToken(req, res.access_token)).pipe(
          tap(() => isRefreshing$.next(false))
        );
      })
    );
  }

  if (req.url.includes('refresh'))
    return next(addToken(req, authService.token!));

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    switchMap((res) => {
      return next(addToken(req, authService.token!));
    })
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  //клонируем запрос
  return (req = req.clone({
    // меняем запрос добавляя в header запроса токен авторизации
    setHeaders: { Authorization: 'Bearer ' + token },
  }));
};
