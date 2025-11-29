import { Component } from '@angular/core';
import { PaginaNoEncontradaComponent } from "../../shared/pagina-no-encontrada/pagina-no-encontrada.component";
import { PaginaNoEncontrada2Component } from "../../shared/pagina-no-encontrada-2/pagina-no-encontrada-2.component";
import { ComponenteEnConstruccionComponent } from "../componente-en-construccion/componente-en-construccion.component";

@Component({
  selector: 'app-componente-mi-perfil',
  standalone: true,
  imports: [PaginaNoEncontradaComponent, PaginaNoEncontrada2Component, ComponenteEnConstruccionComponent],
  templateUrl: './componente-mi-perfil.component.html',
  styleUrl: './componente-mi-perfil.component.css'
})
export class ComponenteMiPerfilComponent {

}
