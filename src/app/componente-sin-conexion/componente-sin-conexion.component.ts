import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-sin-conexion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-sin-conexion.component.html',
  styleUrl: './componente-sin-conexion.component.css'
})
export class ComponenteSinConexionComponent {

  ngOnInit() {
    window.addEventListener('online', () => window.location.reload());
  }

  reintentar() {
    if (navigator.onLine) {
      window.location.reload(); // el usuario ya tiene internet, recarga
    } else {
      Swal.fire({
        icon: "warning",
        title: "Lo sentimos aun no cuentas con conexión a internet 😞",
      })
    }
  }

}
