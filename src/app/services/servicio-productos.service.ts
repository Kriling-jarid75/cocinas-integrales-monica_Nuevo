import { Injectable } from '@angular/core';
import { ProductosModule } from '../modules/productos-module/productos-module';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductosModuleCocinas } from '../models/productos/productos.module';


@Injectable({
  providedIn: 'root'
})
export class ServicioProductosService {

  urlEndPoint = "https://jsonplaceholder.typicode.com/posts";

  urlEnpointDos = "https://dummyjson.com/image/400x200/008080/ffffff?text=Hello+Peter!&fontSize=16";





  productos: ProductosModule[] = [
    { nombre: "Developer 1", url: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, //
    { nombre: "Developer 2", url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 3", url: "https://images.unsplash.com/photo-1573495628363-04667cedc587?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 4", url: "https://plus.unsplash.com/premium_photo-1661320991065-4f1ec9cafde7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { nombre: "Developer 5", url: "https://plus.unsplash.com/premium_photo-1661331617718-e99db3b0e64f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

  ];



  productosCocinas: ProductosModuleCocinas[] = [
    { categoria: 'Cocinas', titulo: 'Cocina Moderna', descripcion: 'Cocina de lujo', url: "" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Cocinas', titulo: 'Cocina Rústica', descripcion: 'Estilo clásico', url: "https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { categoria: 'Bufeteros', titulo: 'Bufetero Blanco', descripcion: 'Espacioso y elegante', url: 'https://picsum.photos/202' },
    { categoria: 'Sillas', titulo: 'Closet Minimalista', descripcion: 'Diseño compacto', url: 'https://picsum.photos/203' },
    { categoria: 'mesasDeCentro', titulo: 'Mesa de Madera', descripcion: 'Clásica y resistente', url: 'https://picsum.photos/204' },
    { categoria: 'puertasDeRecamara', titulo: 'Puerta de Roble', descripcion: 'Segura y elegante', url: 'https://picsum.photos/205' }
  ];

  constructor(protected http: HttpClient) { }


 /*  getProductos() {

    return this.productos;
  }
 */

   getProductos() {

    return this.productosCocinas;
  }

  getProductosPorCategoria(categoria: string) {
    return this.productosCocinas.filter(p => p.categoria === categoria);
  }



  // Aquí puedes definir métodos para obtener, agregar, actualizar o eliminar datos.
  // Por ejemplo:
  getUsuarios(): Observable<any> {
    const codeError = 400;
    return this.http
      .get(`${this.urlEndPoint}`)
      .pipe(
        catchError((e) => {
          if (e.status == codeError) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }
}


