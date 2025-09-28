import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { InicioSesionService } from '../../services/inicio-sesion.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-componente-navegacion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './componente-navegacion.component.html',
  styleUrl: './componente-navegacion.component.css'
})
export class ComponenteNavegacionComponent {
  nombreUsuario: string = '';

  constructor(private authService: InicioSesionService,
       private router: Router   // ✅ aquí inyectamos Router
  ) {}

  ngOnInit() {

    this.nombreUsuario = localStorage.getItem('nombre') || 'Usuario';
  }



  questionUser() {
    Swal.fire({
      title: "Estas seguro de Cerrar Sesión?",
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
      text: 'Has cerrado sesión correctamente',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al login
    });

  }
}
