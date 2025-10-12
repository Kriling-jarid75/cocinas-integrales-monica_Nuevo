import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from './inicio-sesion.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class InactivityService {
  private timeoutId: any;
  private readonly timeout = 5 * 60 * 1000; // 5 minutos sin actividad

  constructor(
    private router: Router,
    private auth: InicioSesionService,
    private ngZone: NgZone
  ) {
    this.startWatching();
  }

  /** Escucha movimientos, clics y teclas */
  startWatching() {
    this.resetTimer();

    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
    window.addEventListener('click', () => this.resetTimer());
  }

  /** Reinicia el temporizador cada vez que hay actividad */
  resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.logoutUser(), this.timeout);
  }

  /** Cierra la sesión por inactividad */
  logoutUser() {
    this.auth.logout();
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada por inactividad',
      text: 'Por seguridad, tu sesión se cerró automáticamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
      history.pushState(null, '', location.href);
      window.onpopstate = () => history.go(1);
    });
  }
}
