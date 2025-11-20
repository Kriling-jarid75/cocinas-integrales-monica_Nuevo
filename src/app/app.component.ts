import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ComponenteSinConexionComponent } from './shared/componente-sin-conexion/componente-sin-conexion.component';
import { OnlineServiceService } from './services/online-service.service';
import { ComponenteBarraSinInternetComponent } from './shared/componente-barra-sin-internet/componente-barra-sin-internet.component';
import { ComponenteNavbarComponent } from "./shared/componente-navbar/componente-navbar.component";
import { PieDePaginaComponent } from "./shared/pie-de-pagina/pie-de-pagina.component";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ComponenteSinConexionComponent,
    ComponenteBarraSinInternetComponent,
    ComponenteNavbarComponent,
    PieDePaginaComponent
]
})
export class AppComponent {
  esAdmin = false;
  initialized = false;
  online = true;

  constructor(private router: Router,
    private serviceSinConexion: OnlineServiceService) { }

  ngOnInit() {
    // Inicializar esAdmin según la URL actual
    this.esAdmin = this.router.url.startsWith('/admin');

    // Escuchar cambios de ruta que colocamos
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.esAdmin = event.urlAfterRedirects.startsWith('/admin');
      this.initialized = true; // indica que ya se puede mostrar el contenido
    });
    this.validarInternet();
  }

  validarInternet() {
    this.serviceSinConexion.online$.subscribe(status => {
      this.online = status;
    });
  }
}
