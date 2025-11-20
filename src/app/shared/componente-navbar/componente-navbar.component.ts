import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

declare var bootstrap: any;


@Component({
  selector: 'app-componente-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './componente-navbar.component.html',
  styleUrl: './componente-navbar.component.css'
})
export class ComponenteNavbarComponent {


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
