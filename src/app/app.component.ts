
import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ComponenteNavegacionComponent } from './navegacion/componente-navegacion/componente-navegacion.component';
import { ComponentePiePaginaComponent } from './footer/componente-pie-pagina/componente-pie-pagina.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ComponenteSinConexionComponent } from './componente-sin-conexion/componente-sin-conexion.component';
import { OnlineServiceService } from './services/online-service.service';
import { ComponenteBarraSinInternetComponent } from './componente-barra-sin-internet/componente-barra-sin-internet.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ComponenteNavegacionComponent,
    ComponentePiePaginaComponent,
    ComponenteSinConexionComponent,
    ComponenteBarraSinInternetComponent]
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
