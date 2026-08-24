import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../../features/auth/models/register-request.model';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../../features/auth/models/login-request.model';
import { LoginResponse } from '../../features/auth/models/login-response.model';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private tokenService = inject(Token);

  private readonly apiUrl = 'http://localhost:8080/api/v1/auth';

  register = (data: RegisterRequest): Observable<void> => {
    return this.http.post<void>(
      `${this.apiUrl}/register`,
      data
    );
  }

  login = (data: LoginRequest): Observable<LoginResponse> => {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data,
      {
        withCredentials: true
      }
    ).pipe(tap(response => this.tokenService.saveAccessToken(response.accessToken)));
  }

  refresh = () => {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/refresh`,
      {},
      {
        withCredentials: true
      }
    ).pipe(tap(response => this.tokenService.saveAccessToken(response.accessToken)));
  }

  logout = () => {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true
      }
    ).pipe(tap(() => this.tokenService.clearAccessToken()));
  }

  restoreSession = (): Observable<boolean> => {
    return this.refresh().pipe(
      map(() => {
        console.log("Sessão restaurada");
        return true
      }),
      catchError(() => {
        console.log("Não existe sessão para restaurar");
        return of(false)
  })
    );
  }

  clearSession = (): void => {
    this.tokenService.clearAccessToken();
  }
}
