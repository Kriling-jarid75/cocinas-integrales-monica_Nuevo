import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: InicioSesionService, private router: Router) {}

 canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const rol = this.authService.getRol();

    if (isLoggedIn) {
      // Redirige según el rol del usuario
      if (rol === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
      return false; // ❌ Bloquea el acceso al /login
    }

    return true; // ✅ Permite acceso si no está logueado
  }
}

/*
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: InicioSesionService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const rol = this.authService.getRol();

      Swal.fire({
        icon: 'info',
        title: 'Ya has iniciado sesión',
        text: rol === 'ADMIN'
          ? 'Redirigiendo a tu panel de administrador...'
          : 'Redirigiendo a la página principal...',
        timer: 2000,
        showConfirmButton: false
      });

      if (rol === 'ADMIN') {
        this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
      } else {
        this.router.navigate(['/'], { replaceUrl: true });
      }
      return false;
    }
    return true;
  }
} */
