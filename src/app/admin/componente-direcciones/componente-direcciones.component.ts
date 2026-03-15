import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


interface Pedido {
  id: string;
  cliente: string;
  direccion: string;
  coordenadas?: { lat: number; lng: number };
  estado: 'Pendiente' | 'En Camino' | 'Entregado';
}



@Component({
  selector: 'app-componente-direcciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-direcciones.component.html',
  styleUrl: './componente-direcciones.component.css'
})
export class ComponenteDireccionesComponent {


  lat!: number;
  lng!: number;

  mapPreviewUrl!: SafeResourceUrl;



  ngOnInit() {
    this.obtenerUbicacionActual();
  }


  constructor(private sanitizer: DomSanitizer) { }

  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }


  // Arreglo de pedidos simulando una respuesta de API
  public pedidos: Pedido[] = [
    {
      id: 'ORD-001',
      cliente: 'Juan Pérez',
      direccion: 'Manzana 1 Lote 58, Prados de San Francisco, 55796 Col. los Aguiluchos, Méx.',
      coordenadas: { lat: 19.7251751, lng: -99.0926243},
      estado: 'Pendiente'
    },
    {
      id: 'ORD-002',
      cliente: 'María García',
      direccion: 'Ángel de la Independencia, CDMX',
      coordenadas: { lat: 19.4270, lng: -99.1677 },
      estado: 'Pendiente'
    },
    {
      id: 'ORD-003',
      cliente: 'Restaurante Local',
      direccion: 'Museo Soumaya, Polanco, CDMX',
      coordenadas: { lat: 19.4407, lng: -99.2047 },
      estado: 'Pendiente'
    },
    {
      id: 'ORD-004',
      cliente: 'nuvo cliente',
      direccion: 'calle gavilanes, Nextlalpan, EDOMEX',
      coordenadas: { lat: 19.725204, lng: -99.092578 },
      estado: 'Pendiente'
    }
  ];

  irADestino(pedido: Pedido) {
    if (!pedido.coordenadas) return;

    const destino = `https://www.google.com/maps/dir/?api=1` +
      `&destination=${pedido.coordenadas.lat},${pedido.coordenadas.lng}` +
      `&travelmode=driving` +
      `&hl=es-419`;

    window.open(destino, '_blank');
  }


  obtenerUbicacionActual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // Estos son los valores que envías a tu base de datos con el pedido
        console.log("Guardar en pedido:", this.lat, this.lng);
      });
    }
  }


  mostrarPreview(pedido: Pedido) {
    if (!pedido.coordenadas) return;

    const url =
      `https://www.google.com/maps?q=${pedido.coordenadas.lat},${pedido.coordenadas.lng}&z=15&output=embed`;

    this.mapPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  /* obtenerUbicacionActual() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      // Estos son los valores que envías a tu base de datos con el pedido
      console.log("Guardar en pedido:", lat, lng);
    });
  }
}

Resumen del Flujo de Datos:
Registro (Cliente): El cliente selecciona su ubicación -> Tu Angular PWA obtiene lat: 19.43 y lng: -99.14 -> Guardas estos números en tu base de datos (Firebase, Node, etc.).
Visualización (Repartidor): Tu app de repartidor consulta la base de datos -> Recibe el arreglo que creamos arriba.
Navegación: El repartidor da clic -> Tu función irADestino usa esas coordenadas guardadas para abrir Google Maps.
¿Te gustaría que te ayude con el código de cómo el cliente capturaría su ubicación usando un mapa interactivo de Google en Angular? Para eso sí necesitarías instalar la librería oficial: npm install @angular/google-maps.



abrirGoogleMaps(url: string) {
  try {
    const ventana = window.open(url, '_blank');

    // Si el navegador bloquea el popup
    if (!ventana) {
      window.location.href = url;
    }
  } catch (error) {
    // Fallback definitivo
    window.location.href = url;
  }
}

pedido: {
  id: "ORD-001",
  cliente: "Juan Pérez",
  direccion: "Palacio de Bellas Artes, CDMX",
  coordenadas: {
    lat: 19.4352,
    lng: -99.1412
  },
  estado: "Pendiente"
}

💡 Regla de oro (anótala)

La navegación SIEMPRE usa coordenadas.
La dirección solo es informativa.


CREATE TABLE pedido (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  cliente_nombre VARCHAR(100),
  direccion_texto VARCHAR(255),
  lat DECIMAL(10,8) NOT NULL,
  lng DECIMAL(11,8) NOT NULL,
  estado VARCHAR(20),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



confirmarEntrega(pedido: Pedido) {
  Swal.fire({
    title: '¿Confirmar entrega?',
    text: 'Esta acción no se puede deshacer',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, entregar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.pedidoService.marcarEntregado(pedido.id).subscribe(() => {
        Swal.fire('Listo', 'Pedido entregado con éxito 🎉', 'success');
      });
    }
  });
}


 */
}
