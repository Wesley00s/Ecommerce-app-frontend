import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'http://192.168.0.113:8080/ecommerce';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/login', { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
          sessionStorage.setItem('userType', value.userType);
        })
      );
  }

  signup(
    userType: string,
    name: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    email: string,
    password: string
  ) {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + '/register', {
        userType,
        name,
        street,
        city,
        state,
        zipCode,
        email,
        password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }
}
