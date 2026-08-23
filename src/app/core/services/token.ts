import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {

  private accessToken: string | null = null;

  saveAccessToken = (accessToken: string): void => {
    this.accessToken = accessToken;
  }

  getAccessToken = (): string | null => this.accessToken;

  clearAccessToken = (): void => {
    this.accessToken = null;
  }

}
