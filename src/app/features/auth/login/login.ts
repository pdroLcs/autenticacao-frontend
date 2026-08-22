import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Input } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { Auth } from '../../../core/services/auth';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Input, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private formBuilder = inject(NonNullableFormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]]
  });

  login = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = this.loginForm.getRawValue();

    this.authService.login(data).subscribe({
      next: (response) => {
        console.log('Login realizado');
        console.log(response);
      },
      error: (error) => {
        console.log('Erro ao fazer login', error);
      }
    })
  }

  get emailError(): string {
    const email = this.loginForm.controls.email;

    if (email.hasError('email') && email.touched) {
      return 'E-mail inválido';
    }
    if (email.hasError('required') && email.touched) {
      return 'E-mail é obrigatório';
    }
    return '';
  }

  get passwordError(): string {
    const password = this.loginForm.controls.password;

    if (password.hasError('required') && password.touched) {
      return 'Senha é obrigatória';
    }
    return '';
  }
}
