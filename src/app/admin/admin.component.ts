import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponenteNavegacionComponent } from './componente-navegacion/componente-navegacion.component';
import { InactivityService } from '../services/inactivity-service.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ComponenteNavegacionComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private inactividadService: InactivityService){

  }

}
