import { Component } from '@angular/core';
import { NuestrosProvedoresComponent } from '../nuestros-provedores/nuestros-provedores.component';
import { EnvioCorreoComponent } from '../envio-correo/envio-correo.component';
import { ComponenteCategoriasProductosComponent } from '../componente-categorias-productos/componente-categorias-productos.component';
import { ComponenteParaVideosComponent } from "../componente-para-videos/componente-para-videos.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NuestrosProvedoresComponent,
    EnvioCorreoComponent,
    ComponenteCategoriasProductosComponent,
    ComponenteParaVideosComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // componente.ts
  numeroWhatsApp = '5610903664';
  mensaje = `🌟 ¡Hola! Gracias por escribirnos a Cocinas Integrales Mónica.
🏠 Estamos comprometidos en ayudarte a crear la cocina ideal para tu hogar.
💬 ¿En qué podemos asistirte hoy?`;

  get whatsappLink() {
    // encodeURIComponent para que los espacios y emojis funcionen correctamente
    return `https://wa.me/${this.numeroWhatsApp}?text=${encodeURIComponent(this.mensaje)}`;
  }


}
