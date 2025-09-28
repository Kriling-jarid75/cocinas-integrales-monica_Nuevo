import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response/login-response.module';
import { LoginRequest } from '../models/login-request/login-request.module';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

 private apiUrl = 'http://localhost:8080/api/auth/login';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = { username, password };
    return this.http.post<LoginResponse>(this.apiUrl, request).pipe(
      tap((response: LoginResponse) => {
        if (response.data.token) {
          localStorage.setItem(this.tokenKey, response.data.token);
          localStorage.setItem('nombre', response.data.administrador);
        }
      })



    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('nombre');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // opcional: validar expiración del token aquí
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


}
