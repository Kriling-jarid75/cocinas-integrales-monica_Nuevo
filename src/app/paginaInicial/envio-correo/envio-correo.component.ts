import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import { API_RESPONSE_CODES } from '../../shared/codigosDeRespuesta/codigosDeRespuesta';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-envio-correo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule,
    MatTooltipModule
  ],
  templateUrl: './envio-correo.component.html',
  styleUrl: './envio-correo.component.css'
})
export class EnvioCorreoComponent {


  envioCorreo: FormGroup;

  isLoading = false;
  constructor(private fb: FormBuilder,
    private service: ServicioProductosService,
  ) {
    this.envioCorreo = this.fb.group({
      nombreCliente: ['', Validators.required],
      correo_telefono_Cliente: ['', [Validators.required, this.validarCorreoTelefono.bind(this)]],
      asuntoCliente: ['', Validators.required],
      mensajeCliente: ['', Validators.required],
    });
  }



  validarCorreoTelefono(control: any) {
    const valor = control.value;

    if (!valor) return { required: true };

    const regexCorreo = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexTelefono = /^[0-9]{10}$/;

    const esCorreo = regexCorreo.test(valor);
    const esTelefono = regexTelefono.test(valor);

    return esCorreo || esTelefono ? null : { formatoInvalido: true };
  }

  enviarCorreo() {

    if (this.isLoading) return; //evita doble envio del correo

    if (this.envioCorreo.valid) {

      this.isLoading = true; // 🚀 activa el loading

      this.service.enviarEmail(this.envioCorreo.value).subscribe({
        next: (data) => {
          if (data.code === API_RESPONSE_CODES.SUCCESS) {
            Swal.fire({
              icon: 'success',
              title: `Se envió correctamente el correo`,
              text: data.message
            });
            this.limiarCampos();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un error al enviar el correo',
              text: data.message
            });
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error en la conexión con el servidor',
          });
        },

        complete: () => {
          this.isLoading = false; // ✅ desactiva el loading al terminar
        }
      });
    } else {

      this.envioCorreo.markAllAsTouched();
    }
  }


  limiarCampos() {
    this.envioCorreo.controls['nombreCliente'].setValue('');
    this.envioCorreo.controls['correo_telefono_Cliente'].setValue('')
    this.envioCorreo.controls['asuntoCliente'].setValue([0]);
    this.envioCorreo.controls['mensajeCliente'].setValue('');

  }





}
