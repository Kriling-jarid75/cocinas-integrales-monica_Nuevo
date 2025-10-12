import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: InicioSesionService, private router: Router) { }

  /*   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const isLoggedIn = this.authService.isLoggedIn();

      if (!isLoggedIn) {
        console.log('Usuario no autenticado, redirigiendo a /login');
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } */

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const rol = this.authService.getRol();

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (rol !== 'ADMIN') {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permisos para acceder a esta sección.',
        confirmButtonText: 'Aceptar'
      });
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}


/*
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: InicioSesionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getRol(); // Obtener el rol del usuario

    if (!isLoggedIn) {
      console.log('Usuario no autenticado, redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }

    // Verificar si el usuario es un ADMIN
    if (userRole !== 'ADMIN') {
      console.log('Acceso denegado: El usuario no tiene permisos de administrador');
      // Puedes redirigir a una página de "acceso denegado" o a la página principal
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
} */


/* import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: InicioSesionService, private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getRol();

    // 🚫 1️⃣ Si no está autenticado
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso denegado',
        text: 'Debes iniciar sesión para acceder a esta sección.',
        confirmButtonText: 'Ir al login'
      }).then(() => {
        this.router.navigate(['/login'], { replaceUrl: true });
      });
      return false;
    }

    // 🚫 2️⃣ Si no es ADMIN
    if (userRole !== 'ADMIN') {
      Swal.fire({
        icon: 'error',
        title: 'Acceso restringido',
        text: 'Esta sección es solo para administradores.',
        confirmButtonText: 'Volver al inicio'
      }).then(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      });
      return false;
    }

    // ✅ 3️⃣ Si es ADMIN autenticado
    return true;
  }
} */

