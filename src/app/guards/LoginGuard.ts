import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InicioSesionService } from '../services/inicio-sesion.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: InicioSesionService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('Usuario ya autenticado, redirigiendo a /admin');
     this.router.navigate(['/admin'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
