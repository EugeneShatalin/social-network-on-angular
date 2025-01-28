import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

//гарды-стражники, защищают переходы в роутинге по условиям, которые в них прописаны
export const canActivteAuth = () => {
  //заносим в переменную булевое авторизации из сервиса авторизации
  const isLoggedIn = inject(AuthService).isAuth

  // если пользователь авторезирован возвращаем true
  if(isLoggedIn) {
    return true;
  }

  // если пользователь не авторезирован перенаправляем на страницу авторизации
  return inject(Router).createUrlTree(['/login'])
}
