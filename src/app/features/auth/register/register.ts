import { Component } from '@angular/core';
import { Input } from "../../../shared/components/input/input";
import { Button } from "../../../shared/components/button/button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Input, Button, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
