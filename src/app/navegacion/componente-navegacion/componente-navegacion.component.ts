import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InicioSesionComponent } from '../../login/inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-componente-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatDialogModule],
  templateUrl: './componente-navegacion.component.html',
  styleUrl: './componente-navegacion.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponenteNavegacionComponent {

}
