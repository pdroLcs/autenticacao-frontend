import { Component } from '@angular/core';
import { Input } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [Input, Button, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
  });

  register = () => {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);
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
