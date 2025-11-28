import { CommonModule, formatCurrency, getCurrencySymbol } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import Swal from 'sweetalert2';
import { ModeloCategorias } from '../../models/productos/productos.module';
import { OnlineServiceService } from '../../services/online-service.service';
import { ComponenteSinConexionComponent } from '../../shared/componente-sin-conexion/componente-sin-conexion.component';
import { API_RESPONSE_CODES } from '../../shared/codigosDeRespuesta/codigosDeRespuesta';

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedImages = [];
    this.imageFiles = [];

    const tamañoMaximoMB = 2; // 🔹 máximo 2MB por imagen
    const tamañoMaximoBytes = tamañoMaximoMB * 1024 * 1024;

    const archivos = Array.from(input.files);
    let archivosInvalidos: string[] = [];

    for (let file of archivos) {
      if (file.size > tamañoMaximoBytes) {
        archivosInvalidos.push(file.name);
        continue; // ❌ No procesamos esta imagen
      }

      // ✅ Si pasa la validación, la guardamos
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // ✅ Mostrar alerta si hubo imágenes demasiado grandes
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

    // ✅ Actualiza el control del formulario
    this.productoForm.patchValue({ imagenes: this.imageFiles });
    this.productoForm.get('imagenes')?.updateValueAndValidity();

    // 🔹 Limpia el input para permitir volver a subir las mismas si el usuario quiere
    input.value = '';
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
