import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InicioSesionService } from '../../services/inicio-sesion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;



@Component({
  selector: 'app-componente-navegacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './componente-navegacion.component.html',
  styleUrl: './componente-navegacion.component.css'
})
export class ComponenteNavegacionComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(private authService: InicioSesionService, private router: Router) {}

/*  constructor(private router: Router) {}

 ngOnInit(): void {
    this.router.events.subscribe(() => {
      const navbar = document.getElementById('navbarCollapse');
      const bsCollapse = bootstrap.Collapse.getInstance(navbar);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  } */


  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || 'Usuario';

    this.router.events.subscribe(() => {
      const navbar = document.getElementById('navbarCollapse');
      const bsCollapse = bootstrap.Collapse.getInstance(navbar);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });












    // Bloquear botón "atrás"
    history.pushState(null, '', location.href);
    window.onpopstate = () => history.go(1);
  }

  questionUser() {
    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4cb323ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cerrarSesion();
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
      history.pushState(null, '', location.href);
      window.onpopstate = () => history.go(1);
    });
  }
}
