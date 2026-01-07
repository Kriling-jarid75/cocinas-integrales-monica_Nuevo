import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Email, ModeloCategorias, ProductosModule, ProductosModuleCocinas, ProductosModuleCocinasNuevos } from '../models/productos/productos.module';
import { environment } from '../../environments/environments';
import { GenericResponse } from '../models/modeloGericoResponseEntity/modeloGenericResponse.module';
import { API_RESPONSE_MESSAGES } from '../shared/codigosDeRespuesta/codigosDeRespuesta';
import Swal from 'sweetalert2';
import { Usuario } from '../models/user/informationUser.module';



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
  // Servicio de productos
  private baseUrl = environment.apiUrl;

  constructor() { }



  listarProductos(): Observable<any> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<string>(`${this.baseUrl}/productos/listar`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {

          Swal.fire({
            icon: 'warning',
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
          });
        }
        return throwError(() => error);
      })
    );
  }



  crearProductoNuevo(producto: ProductosModuleCocinasNuevos, imagenes: File[]): Observable<GenericResponse<string>> {
    const formData = new FormData();

    // 🔹 Mandamos el modelo del producto como JSON
    formData.append('producto', new Blob([JSON.stringify(producto)], { type: 'application/json' }));

    // 🔹 Mandamos todas las imágenes
    imagenes.forEach((file, index) => {
      formData.append('imagenes', file); // el nombre "imagenes" debe coincidir con el del backend
    });

    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/productos/registro`, formData)
      .pipe(catchError(this.handleError));
  }

  // Método para crear un producto
  editarProducto(formData: FormData): Observable<GenericResponse<string>> {

    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/productos/editar`, formData)
      .pipe(catchError(this.handleError));
  }

  eliminarProducto(producto: ProductosModuleCocinasNuevos) {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/productos/eliminar`, producto).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {
          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',
          });
        }
        return throwError(() => error);
      })
    );
  }

  /* +++++++++++++++++++++++++++ METODOS PARA OBTENER LA IFNROMACION DE LAS CATEGORIAS ++++++++++++++++++++++++++++++ */

  obtenerCategorias(): Observable<any> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.get(`${this.baseUrl}/categoria/listar`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {

          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',
          });
        }
        return throwError(() => error);
      })
    );
  }

  // 🔹 Obtener productos por categoría
  getProductosPorCategoriaNueva(categoria: string): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}/categoria/${categoria}`, {});
  }

  // Método para crear una categoria nueva
  crearCategoria(categoria: ModeloCategorias): Observable<GenericResponse<string>> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/categoria/registro`, categoria).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {
          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',
          });
        }
        return throwError(() => error);
      })
    );
  }

  // Método para editar una categoria
  editarCategoria(id_categoria: number, categorias: ModeloCategorias): Observable<GenericResponse<string>> {

    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    // Forzamos explícitamente el Content-Type a JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<GenericResponse<string>>(`${this.baseUrl}/categoria/editar/${id_categoria}`, categorias, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {
          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',

          });
        }
        return throwError(() => error);
      })
    );
  }

  eliminarCategoria(id_categoria: number) {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.delete<GenericResponse<string>>(`${this.baseUrl}/categoria/eliminar/${id_categoria}`,).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {
          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',
          });
        }
        return throwError(() => error);
      })
    );
  }

  eliminarVariasCategorias(idCategorias: ModeloCategorias[]) {

    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/categoria/eliminar/todas`, idCategorias).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {
          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',

          });
        }
        return throwError(() => error);
      })
    );
  }


  /* metodo de enviar correo electronico */
  enviarEmail(email: Email): Observable<any> {

    return this.http.post(`${this.baseUrl}/correo/enviar/email`, email).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {


          Swal.fire({
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
            icon: 'warning',
          });

        }
        return throwError(() => error);
      })
    );
  }

  /* MOSTRAR INFORMACION USUARIO */


  mostrarinformacionUser(nombre_user: any): Observable<GenericResponse<Usuario>> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.post<GenericResponse<Usuario>>(`${this.baseUrl}/usuarios/mostrar/${nombre_user}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {

          Swal.fire({
            icon: 'warning',
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
          });
        }
        return throwError(() => error);
      })
    );

  }

  actualizarInformacionUser(datosUser: any): Observable<GenericResponse<any>> {
    // Aquí ya no es necesario volver a mapear las propiedades si coinciden
    return this.http.put<GenericResponse<any>>(`${this.baseUrl}/usuarios/actualizar/informacion`, datosUser).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor está apagado (dynos=0), el status será 0 o 504
        if (error.status === 0 || error.status === 504) {

          Swal.fire({
            icon: 'warning',
            title: "El backend está pausado. Por favor, avísame para encenderlo.",
          });
        }
        return throwError(() => error);
      })
    );

  }

  private handleError(error: any) {
    let errorMessage = '';

    if (error.status === 0) {
      // Error de red o backend caído
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión o si el backend está activo.';
    } else if (error.status >= API_RESPONSE_MESSAGES[400] && error.status < API_RESPONSE_MESSAGES[500]) {
      errorMessage = `Error del cliente (${error.status}): ${error.error?.message || error.message}`;
    } else if (error.status >= API_RESPONSE_MESSAGES[500]) {
      errorMessage = `Error del servidor (${error.status}): Intenta más tarde.`;
    } else {
      errorMessage = 'Ocurrió un error inesperado.';
    }

    console.error('Error HTTP detectado:', error);
    return throwError(() => new Error(errorMessage));
  }







}


