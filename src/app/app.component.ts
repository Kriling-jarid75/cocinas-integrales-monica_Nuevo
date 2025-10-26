
import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ComponenteNavegacionComponent } from './navegacion/componente-navegacion/componente-navegacion.component';
import { ComponentePiePaginaComponent } from './footer/componente-pie-pagina/componente-pie-pagina.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ComponenteNavegacionComponent,
    ComponentePiePaginaComponent,

  ]
})
export class AppComponent {
  esAdmin = false;
  initialized = false;

  constructor(private router: Router) {} // ✅ solo inyectamos Router

  ngOnInit() {
    // Inicializar esAdmin según la URL actual
    this.esAdmin = this.router.url.startsWith('/admin');

    // Escuchar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.esAdmin = event.urlAfterRedirects.startsWith('/admin');
      this.initialized = true; // indica que ya se puede mostrar el contenido
    });
  }
}
