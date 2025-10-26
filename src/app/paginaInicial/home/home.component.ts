import { Component } from '@angular/core';
import { NuestrosProvedoresComponent } from '../nuestros-provedores/nuestros-provedores.component';
import { EnvioCorreoComponent } from '../envio-correo/envio-correo.component';
import { ComponenteCategoriasProductosComponent } from '../componente-categorias-productos/componente-categorias-productos.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NuestrosProvedoresComponent,
    EnvioCorreoComponent,
    ComponenteCategoriasProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  proveedores = [
    { nombre: 'Proveedor 1', logo: 'icons/facebook.png' },
    { nombre: 'Proveedor 2', logo: 'icons/facebook.png' },
    { nombre: 'Proveedor 3', logo: 'icons/facebook.png' },
    { nombre: 'Proveedor 4', logo: 'icons/facebook.png' },
  ];

  duration = 20; // segundos que tarda en pasar toda la cinta



// componente.ts
numeroWhatsApp = '5523537292';
mensaje = `🌟 ¡Hola! Gracias por escribirnos a Cocinas Integrales Mónica.
🏠 Estamos comprometidos en ayudarte a crear la cocina ideal para tu hogar.
💬 ¿En qué podemos asistirte hoy?`;

get whatsappLink() {
  // encodeURIComponent para que los espacios y emojis funcionen correctamente
  return `https://wa.me/${this.numeroWhatsApp}?text=${encodeURIComponent(this.mensaje)}`;
}


}
