import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Input } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { Auth } from '../../../core/services/auth';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Token } from '../../../core/services/token';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Input, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private formBuilder = inject(NonNullableFormBuilder);
  private tokenService = inject(Token);
  private http = inject(HttpClient);

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
        this.tokenService.saveAccessToken(response.accessToken);
        console.log('Login realizado');
      },
      error: (error) => {
        console.log('Erro ao fazer login', error);
      }
    })
  }

  testProtectedEndpoint = () => {
    this.http.get('http://localhost:8080/api/v1/test', {
      responseType: 'text'
    })
    .subscribe({
      next: (response) => {
        console.log('Resposta:', response);
      },
      error: (error) => {
        console.log('Erro:', error);
      }
    })
  }

  testRefresh = () => {
    this.authService.refresh().subscribe({
      next: response => {
        console.log("Novo access token:", response.accessToken);
      },
      error: error => {
        console.error("Erro no refresh:", error);
      }
    })
  }

  testLogout = (): void => {
    this.authService.logout().subscribe({
      next: () => {

      },
      error: error => {
        console.error("Erro ao fazer logout", error);
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
