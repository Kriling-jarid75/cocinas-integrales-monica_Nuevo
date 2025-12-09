import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginResponse } from '../../models/login-response/login-response.module';
import { InicioSesionService } from '../../services/inicio-sesion.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { API_RESPONSE_CODES } from '../codigosDeRespuesta/codigosDeRespuesta';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from "@angular/cdk/table";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion-admins',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, // 👈 obligatorio para que [formGroup] funcione
    RouterLink, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
     MatIconModule,
      CdkTableModule, CommonModule],
  templateUrl: './inicio-sesion-admins.component.html',
  styleUrl: './inicio-sesion-admins.component.css'
})
export class InicioSesionAdminsComponent {

  public formularioLogin!: FormGroup;

  mostrarPassword = true; // Esta variable controla el tipo de input
  //hide = signal(true);

  constructor(
    public readonly authService: InicioSesionService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    // Solo redirige si hay token y no estamos en modo desarrollo/testing
    /*  if (this.authService.isLoggedIn()) {
       this.router.navigate(['/admin']);
     } */


    this.formularioLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (!this.formularioLogin.valid) {


      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Usuario y contraseña obligatorios',
      });
      return;
    }

    const { username, password } = this.formularioLogin.value;

    this.authService.login(username, password).subscribe({
      next: (response: LoginResponse) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          localStorage.setItem('token', response.data.token);
          Swal.fire('Éxito', response.message, 'success');
          this.router.navigate(['/admin']);

        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
      error: () => {
        Swal.fire('Error', 'Credenciales incorrectas o servidor no disponible', 'error');
      }
    });
  }


  clickEvent(event: MouseEvent) {
    //this.hide.set(!this.hide());
    this.mostrarPassword = !this.mostrarPassword;
    event.stopPropagation();
  }
}
