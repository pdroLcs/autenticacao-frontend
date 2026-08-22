import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../services/token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(Token);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/register') || req.url.includes('/auth/refresh')) {
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

  return next(req);
};
