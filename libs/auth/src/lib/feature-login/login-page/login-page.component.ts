import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import {AuthService} from '@tt/auth';
import {TtInputComponent} from '@tt/common-ui';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form: FormGroup = new FormGroup({
    username: new FormControl('llllllllljjjjjjjjjjj', Validators.required),
    password: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

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
