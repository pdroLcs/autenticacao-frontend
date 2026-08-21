import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Input } from "../../../shared/components/input/input";

@Component({
  selector: 'app-login',
  imports: [RouterLink, Input],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
