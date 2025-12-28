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




  constructor(private fb: FormBuilder,
    private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService,

  ) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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


  saveChanges() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.accountForm.get('name')?.value);
    formData.append('email', this.accountForm.get('email')?.value);
    formData.append('password', this.accountForm.get('password')?.value || '');

    if (this.accountForm.get('photo')?.value) {
      formData.append('photo', this.accountForm.get('photo')?.value);
    }

    console.log('Datos enviados:', formData);

    // 🔥 Aquí llamas a tu backend
    // this.userService.updateProfile(formData).subscribe(...)
  }



  cargarInformacionUser() {
    this.isLoading = true;
    this.service.mostrarinformacionUser().subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {

          console.log("Mostramos la data " + JSON.stringify(response.data));


          // 🔹 Simulación de datos del usuario (backend)
          this.accountForm.patchValue({
            name: response.data.nombre_usuarios,
            email: response.data.email_usuarios
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





}
