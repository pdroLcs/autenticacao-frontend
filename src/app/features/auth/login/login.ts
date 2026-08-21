import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Input } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";

@Component({
  selector: 'app-login',
  imports: [RouterLink, Input, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
