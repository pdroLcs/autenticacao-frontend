import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';

  saveTokens = (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAccessToken = (): string | null => localStorage.getItem(this.accessTokenKey);

  getRefreshToken = (): string | null => localStorage.getItem(this.refreshTokenKey);

  clearTokens = (): void => {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

}
