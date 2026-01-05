import { CommonModule, formatCurrency, getCurrencySymbol } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServicioProductosService } from '../../services/servicio-general.service';
import Swal from 'sweetalert2';
import { ModeloCategorias } from '../../models/productos/productos.module';
import { OnlineServiceService } from '../../services/online-service.service';
import { ComponenteSinConexionComponent } from '../../shared/componente-sin-conexion/componente-sin-conexion.component';
import { API_RESPONSE_CODES } from '../../shared/codigosDeRespuesta/codigosDeRespuesta';

import imageCompression from 'browser-image-compression';


@Component({
  selector: 'app-componente-registro-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ComponenteSinConexionComponent],
  templateUrl: './componente-registro-productos.component.html',
  styleUrl: './componente-registro-productos.component.css'
})
export class ComponenteRegistroProductosComponent {
  productoForm: FormGroup;
  //public precio: string;


  categoriasNuevas: Array<ModeloCategorias> = [];

  selectedImages: string[] = []; // URLs para mostrar vista previa
  imageFiles: File[] = []; // Archivos reales para enviar al backend
  online = true;
  isLoading = false;

  constructor(private fb: FormBuilder,
    private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      // precio: ['', [Validators.required, Validators.pattern(/^[\$\d,]+(\.\d{1,2})?$/)]]
      imagenes: [null, Validators.required]
    });

    // this.precio = '';
  }

  ngOnInit() {
    this.obtenerCategorias();

    this.validarInternet();
  }

  validarInternet() {
    this.serviceSinConexion.online$.subscribe(status => {
      this.online = status;
      if (status) this.obtenerCategorias();
    });
  }

  obtenerCategorias() {
    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          this.categoriasNuevas = response.data as ModeloCategorias[];
          console.log("Mostramos todos los valores " + JSON.stringify(this.categoriasNuevas));
        } else {
          this.categoriasNuevas = []; // aseguramos que las categoriasNuevas esten vacias
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }

 async onFileSelected(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  // 1. Configuración de compresión para Cloudinary
  const opciones = {
    maxSizeMB: 1,           // Cloudinary acepta hasta 10MB, pero 1MB es ideal para móviles
    maxWidthOrHeight: 1920, // Resolución Full HD
    useWebWorker: true,     // Evita que la app se trabe durante el proceso
    initialQuality: 0.8     // Buena relación calidad/peso
  };

  this.selectedImages = [];
  this.imageFiles = [];
  const archivos = Array.from(input.files);

  for (let file of archivos) {
    try {
      // 2. Comprimir la imagen antes de procesarla
      // Esto convierte fotos de 10MB en archivos de ~800KB automáticamente
      const archivoComprimido = await imageCompression(file, opciones);

      // 3. Guardar el archivo comprimido (tipo File) para el envío al servidor
      this.imageFiles.push(archivoComprimido);

      // 4. Generar la previsualización para el usuario
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result);
      };
      reader.readAsDataURL(archivoComprimido);

    } catch (error) {
      console.error("Error al comprimir la imagen:", error);
      // Opcional: mostrar una alerta si algo falla
    }
  }

  // Actualizar el formulario con los archivos ya comprimidos
  this.productoForm.patchValue({ imagenes: this.imageFiles });
  this.productoForm.get('imagenes')?.updateValueAndValidity();

  input.value = ''; // Limpiar input
}


  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.imageFiles.splice(index, 1);

    // Si ya no hay imágenes, marcar el campo como inválido
    if (this.imageFiles.length === 0) {
      this.productoForm.patchValue({ imagenes: null });
      this.productoForm.get('imagenes')?.setErrors({ required: true });
    } else {
      this.productoForm.patchValue({ imagenes: this.imageFiles });
    }

    this.productoForm.get('imagenes')?.updateValueAndValidity();
  }

  registrarProducto() {
    // Si deseas permitir actualizar sin imágenes, no fuerces validación de imagenes aquí.
    if (!this.productoForm.valid) {
      return this.productoForm.markAllAsTouched();
    }

    const productoNuevo = {
      ...this.productoForm.value,

    };
    this.isLoading = true; // 🚀 activa el loading
    this.service.crearProductoNuevo(productoNuevo, this.imageFiles).subscribe({
      next: (data) => {
        if (data.code === API_RESPONSE_CODES.SUCCESS) {
          Swal.fire({
            icon: 'success',
            title: `Se registró correctamente el producto: ${productoNuevo.nombre}`,
            text: data.message
          });
          this.limiarCampos();
          this.selectedImages = [];
          this.imageFiles = [];

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al registrar el producto',
            text: data.message
          });
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      },

      complete: () => {
        this.isLoading = false; // ✅ desactiva el loading al terminar
      }
    });

    console.log('Producto registrado:', productoNuevo);

  }


  limiarCampos() {
    this.productoForm.controls['nombre'].setValue('');
    this.productoForm.controls['descripcion'].setValue('')
    this.productoForm.controls['categoria'].setValue([0]);
    // this.productoForm.controls['precio'].setValue('');
  }








}
