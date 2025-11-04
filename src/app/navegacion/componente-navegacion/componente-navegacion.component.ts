import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


declare var bootstrap: any;



@Component({
  selector: 'app-componente-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatDialogModule,RouterLink],
  templateUrl: './componente-navegacion.component.html',
  styleUrl: './componente-navegacion.component.css',
})
export class ComponenteNavegacionComponent {


  constructor(private router: Router) {}

 ngOnInit(): void {
    this.router.events.subscribe(() => {
      const navbar = document.getElementById('navbarCollapse');
      const bsCollapse = bootstrap.Collapse.getInstance(navbar);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  }

}
