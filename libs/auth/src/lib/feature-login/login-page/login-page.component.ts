import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import {AuthService} from '@tt/auth';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      //ts-ignore
      this.authService
        .login(this.form.value) //отправляе введеные данные в форму на сервер
        .subscribe((res) => {
          //после регистрации перенапрвляем на главную страницу
          //если авторизация прошла успешно, пользователь будет авторезирован,
          // если нет, гард вернет его на страницу авторизации
          this.router.navigate(['']);
        });
    }
  }
}
