import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../services/token';
import { Auth } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(Token);
  const authService = inject(Auth);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/register') || req.url.includes('/auth/refresh') || req.url.includes('/auth/logout')) {
    return next(req);
  }

  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status !== 401) {
      return throwError(() => error);
    }

    return authService.refresh().pipe(switchMap(() => {
      const newAccessToken = tokenService.getAccessToken();

      const retryRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${newAccessToken}`
        }
      });

      return next(retryRequest);
    }))
  }));
};
