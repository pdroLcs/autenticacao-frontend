import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../../features/auth/models/register-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/v1/auth';

  register = (data: RegisterRequest): Observable<void> => {
    return this.http.post<void>(
      `${this.apiUrl}/register`,
      data
    );
  }
}
