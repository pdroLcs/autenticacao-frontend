import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../services/token';
import { Auth } from '../services/auth';
import { catchError, finalize, Observable, shareReplay, switchMap, throwError } from 'rxjs';

let refreshRequest$: Observable<string> | null = null;

const RETRIED = new HttpContextToken<boolean>(() => false);

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
    if (req.context.get(RETRIED)) {
      return throwError(() => error);
    }

    if (!refreshRequest$) {
      refreshRequest$ = authService.refresh().pipe(
        switchMap(response => [response.accessToken]),
        finalize(() => {
          refreshRequest$ = null;
        }),
        shareReplay(1)
      );
    }

    return refreshRequest$.pipe(switchMap(newAccessToken => {
      const retryRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${newAccessToken}`
        },
        context: req.context.set(RETRIED, true)
      });

      return next(retryRequest);
    }),

    catchError(refreshError => {
      tokenService.clearAccessToken();

      return throwError(() => refreshError);
    })
  );

    // return authService.refresh().pipe(switchMap(() => {
    //   const newAccessToken = tokenService.getAccessToken();

    //   const retryRequest = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${newAccessToken}`
    //     }
    //   });

    //   return next(retryRequest);
    // }))
  }));
};
