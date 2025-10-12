import { inject, Injectable } from '@angular/core';
import { ProductosModule } from '../modules/productos-module/productos-module';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GenericResponse, ProductosModuleCocinas, ProductosModuleCocinasNuevos } from '../models/productos/productos.module';
import { environment } from '../../environments/environments';



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
    { categoria: '', titulo: '', descripcion: '', url: "" },
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
    { categoria: '', titulo: '', descripcion: '', url: '' },
    { categoria: 'Sillas', titulo: 'Silla Minimalista', descripcion: 'Diseño compacto', url: 'https://picsum.photos/203' },
    { categoria: 'mesasDeCentro', titulo: 'Mesa de Madera', descripcion: 'Clásica y resistente', url: 'https://picsum.photos/204' },
    { categoria: 'puertasDeRecamara', titulo: 'Puerta de Roble', descripcion: 'Segura y elegante', url: 'https://picsum.photos/205' }
  ];


    private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/productos';  // 👈 toma la URL según el entorno

  constructor() { }


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




  listarProductos(): Observable<any> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<string>(`${this.baseUrl}/listar`, {}).pipe(
      catchError(this.handleError) // 👈 Manejo centralizado
    );;
  }


  // Método para crear un producto
  crearProducto(producto: ProductosModuleCocinasNuevos): Observable<GenericResponse<string>> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/registrar`, producto).pipe(
      catchError(this.handleError) // 👈 Manejo centralizado
    );
  }

  // Método para crear un producto
  editarProducto(producto: ProductosModuleCocinasNuevos): Observable<GenericResponse<string>> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/editar`, producto).pipe(
      catchError(this.handleError) // 👈 Manejo centralizado
    );
  }

    eliminarProducto(producto: ProductosModuleCocinasNuevos) {
     // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/eliminar`, producto).pipe(
      catchError(this.handleError) // 👈 Manejo centralizado
    );
  }


  private handleError(error: any) {
    let errorMessage = '';

    if (error.status === 0) {
      // Error de red o backend caído
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión o si el backend está activo.';
    } else if (error.status >= 400 && error.status < 500) {
      errorMessage = `Error del cliente (${error.status}): ${error.error?.message || error.message}`;
    } else if (error.status >= 500) {
      errorMessage = `Error del servidor (${error.status}): Intenta más tarde.`;
    } else {
      errorMessage = 'Ocurrió un error inesperado.';
    }

    console.error('Error HTTP detectado:', error);
    return throwError(() => new Error(errorMessage));
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


