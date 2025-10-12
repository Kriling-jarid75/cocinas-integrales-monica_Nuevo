import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { InicioSesionService } from '../../services/inicio-sesion.service';
import { LoginResponse } from '../../models/login-response/login-response.module';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule // 👈 obligatorio para que [formGroup] funcione
    ,
    RouterLink
],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioSesionComponent implements OnInit {

  public formularioLogin!: FormGroup;
  public ESTATUS_CORRECTO = 200;

  constructor(
    public readonly authService: InicioSesionService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    // Solo redirige si hay token y no estamos en modo desarrollo/testing
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }


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
        if (response.code === this.ESTATUS_CORRECTO) {
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
