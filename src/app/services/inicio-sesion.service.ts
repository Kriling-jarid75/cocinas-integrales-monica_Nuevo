import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response/login-response.module';
import { LoginRequest } from '../models/login-request/login-request.module';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;  // 👈 toma la URL según el entorno
  private tokenKey = 'auth_token';
  private expiryKey = 'token_expiry';
  private nombreKey = 'nombre';
  private rolKey = 'rol_usuario'; // 👈 nueva clave para el rol

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = { username, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, request).pipe(
      tap((response: LoginResponse) => {
        if (response.data.token) {
          const expiry = new Date();
          expiry.setMinutes(expiry.getMinutes() + 30); // sesión válida por 30 minutos
          localStorage.setItem(this.tokenKey, response.data.token);
          localStorage.setItem(this.nombreKey, response.data.administrador);
          localStorage.setItem(this.expiryKey, expiry.toISOString());

          // 👇 Asignamos el rol: como es login exitoso, es ADMIN
          localStorage.setItem(this.rolKey, 'ADMIN');
        }
      })
    );
  }

  /** Cierre de sesión manual o automático */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expiryKey);
    localStorage.removeItem(this.nombreKey);
    localStorage.removeItem(this.rolKey); // 👈 limpiar el rol
  }

  /** Verifica si hay sesión activa */
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const expiry = localStorage.getItem(this.expiryKey);

    if (!token || !expiry) return false;

    const now = new Date();
    const expiresAt = new Date(expiry);

    if (now > expiresAt) {
      this.sessionExpiredAlert();
      return false;
    }

    return true;
  }

  /** Obtiene el rol del usuario */
  getRol(): string | null {

    const valoresLocales = localStorage.getItem(this.rolKey);

    console.log("Mostramos valores del local storage ", valoresLocales);

    return valoresLocales;
  }

  /** Alerta personalizada al expirar sesión */
  private sessionExpiredAlert() {
    Swal.fire({
      icon: 'warning',
      title: 'Sesión expirada',
      text: 'Tu sesión ha caducado. Inicia sesión nuevamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}
