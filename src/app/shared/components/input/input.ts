import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  label = input('');
  type = input('text');
  name = input('');
  id = input('');
  placeholder = input('');
}
