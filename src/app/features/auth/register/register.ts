import { Component, inject } from '@angular/core';
import { Input } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [Input, Button, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(Auth);
  private formBuilder = inject(NonNullableFormBuilder);

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
  });

  register = () => {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = this.registerForm.getRawValue();

    this.authService.register(data).subscribe({
      next: () => {
        console.log('Usuário cadastrado!');
      },
      error: (error) => {
        console.log('Erro ao cadastrar usuário', error);
      }
    })
  }

  get nameError(): string {
    const name = this.registerForm.controls.name;

    if (name.hasError('required') && name.touched) {
      return 'Nome é obrigatório';
    }

    return '';
  }

  get emailError(): string {
    const email = this.registerForm.controls.email;

    if (email.hasError('email') && email.touched) {
      return 'E-mail inválido';
    }
    if (email.hasError('required') && email.touched) {
      return 'E-mail é obrigatório';
    }
    if (email.hasError('maxlength') && email.touched) {
      return 'E-mail deve ter no máximo 255 caracteres';
    }
    return '';
  }

  get passwordError(): string {
    const password = this.registerForm.controls.password;

    if (password.hasError('required') && password.touched) {
      return 'Senha é obrigatória';
    }
    if (password.hasError('minlength') && password.touched) {
      return 'Senha deve ter no mínimo 4 caracteres';
    }
    if (password.hasError('maxlength') && password.touched) {
      return 'Senha deve ter no máximo 255 caracteres';
    }
    return '';
  }
}
