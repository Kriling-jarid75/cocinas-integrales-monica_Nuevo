import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envio-correo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './envio-correo.component.html',
  styleUrl: './envio-correo.component.css'
})
export class EnvioCorreoComponent {


  enviarCorreo() {
    Swal.fire({
      title: "Mensaje Enviado Correctamente",
      icon: "success",
      
    });
  }



}
