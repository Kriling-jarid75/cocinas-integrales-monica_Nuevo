import { CommonModule, formatCurrency, getCurrencySymbol } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { ModeloCategorias, ProductosModuleCocinasNuevos } from '../../../models/productos/productos.module';
import { API_RESPONSE_CODES } from '../../../shared/codigosDeRespuesta/codigosDeRespuesta';

type SelectedImage = {
  preview: string;    // dataURL o url del servidor
  file?: File;        // si es imagen nueva
  url?: string;       // si es imagen existente (url en servidor)
};



@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  // 🧠 Caché para evitar llamadas repetidas
  static categoriasCache: Array<ModeloCategorias> | null = null;


  productoForm!: FormGroup;
  categoriasNuevas: Array<ModeloCategorias> = [];
  selectedImages: SelectedImage[] = [];
  imageFiles: File[] = [];               // archivos nuevos que se enviarán
  imagenesEliminadas: string[] = [];     // urls (o nombres) marcadas para eliminar
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: ProductosModuleCocinasNuevos,
    private service: ServicioProductosService,
    private fb: FormBuilder
  ) { }



  ngOnInit() {
    console.log("Mostramos los productos " + JSON.stringify(this.producto));
    this.productoForm = this.fb.group({
      nombre: [this.producto?.nombre || '', Validators.required],
      descripcion: [this.producto?.descripcion || '', Validators.required],
      categoria: [this.producto?.categoria?.idCategoria || null, Validators.required],
     

    });

    this.resetImagenes();

    this.cargarCategorias();
  }


  resetImagenes() {

    this.selectedImages = this.producto?.imagen?.map(img => ({
      preview: img.url_imagen,
      url: img.url_imagen
    })) || [];

    this.imageFiles = [];
    this.imagenesEliminadas = [];

  }

  cargarCategorias() {
    // ✅ Si hay caché, úsala
    if (EditarProductoComponent.categoriasCache) {
      this.categoriasNuevas = [...EditarProductoComponent.categoriasCache];
      this.reaplicarCategoria();
      return;
    }

    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS && response.data?.length > 0) {
          this.categoriasNuevas = response.data;
          EditarProductoComponent.categoriasCache = [...response.data];
          this.reaplicarCategoria();
        } else {
          this.categoriasNuevas = [];
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

  private reaplicarCategoria(): void {
    if (this.producto?.categoria) {
      this.productoForm.get('categoria')?.setValue(this.producto.categoria.idCategoria);
    }
  }

  // ---------------------------
  // Manejo de selección de archivos
  // ---------------------------
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const archivos = Array.from(input.files) as File[];
    const tamañoMaximoMB = 2;
    const tamañoMaximoBytes = tamañoMaximoMB * 1024 * 1024;
    const archivosInvalidos: string[] = [];

    archivos.forEach(file => {
      if (file.size > tamañoMaximoBytes) {
        archivosInvalidos.push(file.name);
        return;
      }

      // Agregar a lista de archivos a enviar
      this.imageFiles.push(file);

      // Crear preview y agregar a selectedImages (sin borrar lo anterior)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push({
          preview: e.target.result,
          file
        });
      };
      reader.readAsDataURL(file);
    });

    if (archivosInvalidos.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Imágenes demasiado grandes',
        html: `
          Las siguientes imágenes superan el tamaño máximo permitido (${tamañoMaximoMB} MB):<br>
          <ul style="text-align:left; margin-top:10px;">
            ${archivosInvalidos.map(n => `<li>${n}</li>`).join('')}
          </ul>
        `,
        confirmButtonColor: '#d33'
      });
    }

    // Actualiza el control del formulario (si quieres forzar validación)
    this.productoForm.patchValue({ imagenes: this.imageFiles.length ? this.imageFiles : null });
    this.productoForm.get('imagenes')?.markAsTouched();

    // limpia input para permitir volver a subir el mismo archivo
    input.value = '';
  }


  // ---------------------------
  // Eliminar imagen (existente o nueva)
  // ---------------------------
  removeImage(index: number): void {
    const img = this.selectedImages[index];

    if (!img) return;

    if (img.url) {
      // imagen existente: marcar para eliminar (backend debe procesar)
      this.imagenesEliminadas.push(img.url);
    } else if (img.file) {
      // imagen nueva: quitar del array de archivos a enviar
      const fileIndex = this.imageFiles.findIndex(f => f === img.file);
      if (fileIndex >= 0) this.imageFiles.splice(fileIndex, 1);
    }

    // quitar de la vista
    this.selectedImages.splice(index, 1);

    // actualizar formulario
    if (this.selectedImages.length === 0) {
      // si quieres forzar que tenga al menos una imagen, descomenta la línea siguiente:
      this.productoForm.get('imagenes')?.setErrors({ required: true });
    } else {
      this.productoForm.patchValue({ imagenes: this.imageFiles.length ? this.imageFiles : null });
    }
  }


  // ---------------------------
  // Envío: armar FormData y llamar servicio
  // ---------------------------
  editarProducto() {
    // Si deseas permitir actualizar sin imágenes, no fuerces validación de imagenes aquí.
    if (!this.productoForm.valid) {
      return this.productoForm.markAllAsTouched();
    }

    this.isLoading = true;

    const valorFormulario = this.productoForm.value;

    // Construir objeto producto que envías en el FormData
    const productoAEnviar = {
      ...this.producto,
      nombre: valorFormulario.nombre,
      descripcion: valorFormulario.descripcion,
      categoria: {
        idCategoria: valorFormulario.categoria,
        nombreCategoria: this.categoriasNuevas.find(cat => cat.idCategoria === valorFormulario.categoria)?.nombreCategoria || ''
      }
      // No es necesario incluir imagenes aquí (las manejamos por separado)
    };

    // Armar FormData
    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(productoAEnviar)], { type: 'application/json' }));

    // Archivos nuevos
    this.imageFiles.forEach(file => formData.append('imagenes', file));

    // Imágenes a eliminar (enviamos las URLs que marcamos)
    formData.append('imagenesEliminadas', new Blob([JSON.stringify(this.imagenesEliminadas)], { type: 'application/json' }));

    // Llamada al servicio — recomienda implementar editarProductoFormData en tu service
    this.service.editarProducto(formData).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data.code === API_RESPONSE_CODES.SUCCESS) {
          Swal.fire({
            icon: 'success',
            title: `Se actualizó correctamente el producto: ${productoAEnviar.nombre}`,
            text: data.message
          });
          this.dialogRef.close('updated');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al actualizar el producto',
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
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close(); // 👈 puedes devolver algo si quieres
  }

}
