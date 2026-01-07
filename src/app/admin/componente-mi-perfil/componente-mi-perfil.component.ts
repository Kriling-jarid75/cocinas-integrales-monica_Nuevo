import { Component } from '@angular/core';
import { PaginaNoEncontradaComponent } from "../../shared/pagina-no-encontrada/pagina-no-encontrada.component";
import { PaginaNoEncontrada2Component } from "../../shared/pagina-no-encontrada-2/pagina-no-encontrada-2.component";
import { ComponenteEnConstruccionComponent } from "../componente-en-construccion/componente-en-construccion.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServicioProductosService } from '../../services/servicio-general.service';
import { OnlineServiceService } from '../../services/online-service.service';
import Swal from 'sweetalert2';
import { API_RESPONSE_CODES } from '../../shared/codigosDeRespuesta/codigosDeRespuesta';
import { InicioSesionService } from '../../services/inicio-sesion.service';
import { Usuario } from '../../models/user/informationUser.module';

@Component({
  selector: 'app-componente-mi-perfil',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule, MatFormField, MatInputModule, MatSelectModule],
  templateUrl: './componente-mi-perfil.component.html',
  styleUrl: './componente-mi-perfil.component.css'
})
export class ComponenteMiPerfilComponent {


  accountForm!: FormGroup;
  defaultAvatar = 'assets/user-default.png';
  photoPreview: string | ArrayBuffer | null = null;
  selectedFile!: File;
  online = true;
  isLoading = true;
  data!: Usuario;




  constructor(private fb: FormBuilder,
    private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService,
    private incioSesion: InicioSesionService

  ) { }

  ngOnInit(): void {

    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.validarCorreo.bind(this)]],
      password: ['', Validators.minLength(6)],
      photo: [null]
    });



    this.photoPreview = 'icons/user.png'; // imagen por defecto


    this.cargarInformacionUser();
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


  cargarInformacionUser() {
    this.isLoading = true;

    const nombre_user = this.incioSesion.getNombreAdmin();
    this.service.mostrarinformacionUser(nombre_user).subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {

          this.data = response.data as Usuario;

          console.log("Mostramos la data " + JSON.stringify(response.data));


          // 🔹 Simulación de datos del usuario (backend)
          this.accountForm.patchValue({
            name: this.data.nombre_usuarios,
            email: this.data.email_usuarios
          });

        }

        if (response.code === API_RESPONSE_CODES.NO_CONTENT) {
          Swal.fire({
            icon: 'info',
            title: 'No hay información del usuario',
          });
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }


  saveChanges() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    /*  const formData = new FormData();
     formData.append('name', this.accountForm.get('name')?.value);
     formData.append('email', this.accountForm.get('email')?.value);
     formData.append('password', this.accountForm.get('password')?.value || ''); */

    /*  if (this.accountForm.get('photo')?.value) {
       formData.append('photo', this.accountForm.get('photo')?.value);
     } */

    const datos: Usuario = {
      id_usuarios: this.data.id_usuarios, // El ID que guardamos en el login
      nombre_usuarios: this.accountForm.get('name')?.value,
      email_usuarios: this.accountForm.get('email')?.value,
      password_usuarios: this.accountForm.get('password')?.value || null // Si está vacío, envía null
    };

    console.log('Datos enviados:', datos);

    // 🔥 Aquí llamas a tu backend
    this.service.actualizarInformacionUser(datos).subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          console.log("Mostramos la data " + JSON.stringify(response.data));

          // 🔹 Simulación de datos del usuario (backend)
          this.accountForm.patchValue({
            name: response.data.nombre_usuarios,
            email: response.data.email_usuarios
          });

          Swal.fire({
            icon: 'success',
            title: `Se actualizó correctamente la
            información del usuario: ${this.data.nombre_usuarios}`,
          });

        }

        if (response.code === API_RESPONSE_CODES.NO_CONTENT) {
          Swal.fire({
            icon: 'info',
            title: 'No hay información del usuario',
          });
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }


  validarCorreo(control: any) {
    const valor = control.value;

    // Si está vacío, no marcamos error de formato (el error 'required' se encarga en otro validador)
    if (!valor) return null;

    // Regex estándar moderna para correos electrónicos
    const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const esValido = regexCorreo.test(valor);

    // Si es válido retornamos null, si no, retornamos el objeto de error
    return esValido ? null : { formatoInvalido: true };
  }





}
