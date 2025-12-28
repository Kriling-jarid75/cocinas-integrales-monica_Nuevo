import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: InicioSesionService, private router: Router) { }

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


