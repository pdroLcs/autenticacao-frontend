import { Component, input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  type = input('submit');
  label = input('');
  class = input('');
  variant = input<'primary' | 'secondary' | 'danger' | 'default'>('default');
}
