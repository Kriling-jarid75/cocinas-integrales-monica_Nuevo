import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginResponse } from '../../models/login-response/login-response.module';
import { InicioSesionService } from '../../services/inicio-sesion.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { API_RESPONSE_CODES } from '../codigosDeRespuesta/codigosDeRespuesta';

@Component({
  selector: 'app-inicio-sesion-admins',
  standalone: true,
  imports: [ MatDialogModule,MatButtonModule,ReactiveFormsModule, // 👈 obligatorio para que [formGroup] funcione
  RouterLink],
  templateUrl: './inicio-sesion-admins.component.html',
  styleUrl: './inicio-sesion-admins.component.css'
})
export class InicioSesionAdminsComponent {

 public formularioLogin!: FormGroup;

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
}
