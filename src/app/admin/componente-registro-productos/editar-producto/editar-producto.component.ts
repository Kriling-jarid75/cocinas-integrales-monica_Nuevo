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


  productoForm!: FormGroup;
  categoriasNuevas!: Array<ModeloCategorias>;
  // 🧠 Caché para evitar llamadas repetidas
  static categoriasCache: Array<ModeloCategorias> | null = null;



  constructor(public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: ProductosModuleCocinasNuevos,
    private service: ServicioProductosService,
    private fb: FormBuilder) {  }

  ngOnInit() {

    console.log("Mostramos los productos " + JSON.stringify(this.producto));

    this.productoForm = this.fb.group({
      nombre: [this.producto?.nombre || '', Validators.required],
      descripcion: [this.producto?.descripcion || '', Validators.required],
      // Si categoria es string:
      categoria: [this.producto?.categoria?.nombreCategoria || '', Validators.required],
      // Si fuera arreglo, cámbialo por: this.producto?.categoria[0] || ''
      //precio: [this.formatCurrencyVal(this.producto?.precio || null),
      //[Validators.required, Validators.pattern(/^[\$\d,]+(\.\d{1,2})?$/)]],
    });

    this.cargarCategorias();

  }


  cargarCategorias() {

    debugger
    // ✅ Si hay caché, úsala
    if (EditarProductoComponent.categoriasCache) {
      this.categoriasNuevas = [...EditarProductoComponent.categoriasCache];
      this.reaplicarCategoria();
      return;
    }

    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.code === 200 && response.data?.length > 0) {
          this.categoriasNuevas = response.data;
          EditarProductoComponent.categoriasCache = [...response.data];
          this.reaplicarCategoria();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar categorías',
            text: response.message
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

  private reaplicarCategoria(): void {
    if (this.producto?.categoria) {
      this.productoForm.get('categoria')?.setValue(this.producto.categoria.idCategoria);
    }
  }

  formatCurrencyVal(value: string): string {
    if (value.includes('$')) {
      value = value.replace('$', '');
    }
    if (value.includes(',')) {
      value = value.replace(/,/g, '');
    }

    let val;
    if (value === '' || value === undefined) {
      val = 0;
    } else {
      val = parseFloat(value);
    }

    return formatCurrency(val, 'en-USD', getCurrencySymbol('USD', 'wide'));
  }




  editarProducto() {
    if (this.productoForm.valid) {
      const precioLimpio = this.precioFormateado(this.productoForm.value.precio);
      const productoActualizado = {
        ...this.productoForm.value,
        precio: precioLimpio,
        idProducto: this.producto.id
      };


      // Llamada al servicio
      this.service.editarProducto(productoActualizado).subscribe({
        next: (data) => {
          if (data.code === 200) {
            Swal.fire({
              icon: 'success',
              title: `Se actualizó correctamente el producto: ${productoActualizado.nombre}`,
              text: data.message
            });
            this.limiarCampos();
            this.cerrar();
            // Cierra el diálogo y notifica al padre
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
    } else {
      // Muestra los errores solo después de intentar enviar
      this.productoForm.markAllAsTouched();
    }
  }


  limiarCampos() {
    this.productoForm.controls['nombre'].setValue('');
    this.productoForm.controls['descripcion'].setValue('')
    this.productoForm.controls['categoria'].setValue([0]);
    this.productoForm.controls['precio'].setValue('');
  }


  cerrar(): void {
    this.dialogRef.close(); // 👈 puedes devolver algo si quieres
  }



  validateFormat(event: KeyboardEvent) {
    const CATORCE = 14;
    const DOS = 2;

    const input = event.target as HTMLInputElement;
    const valorActual = input.value || '';
    const key = event.key;

    // ✅ Permitir borrar y moverse
    if (
      key === 'Backspace' ||
      key === 'Delete' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Tab'
    ) {
      return;
    }

    // ✅ Solo números o punto decimal
    const regex = /^[0-9.]$/;
    if (!regex.test(key)) {
      event.preventDefault();
      return;
    }

    // ✅ Solo un punto decimal
    if (valorActual.includes('.') && key === '.') {
      event.preventDefault();
      return;
    }

    // ✅ Máximo 14 enteros
    const partes = valorActual.split('.');
    if (!valorActual.includes('.') && partes[0].length >= CATORCE && key !== '.') {
      event.preventDefault();
      return;
    }

    // ✅ Máximo 2 decimales
    if (valorActual.includes('.') && partes[1]?.length >= DOS) {
      event.preventDefault();
      return;
    }
  }

  updateValue(value: string) {
    if (!value) return;

    // 🔹 Eliminar todo excepto números y punto
    const limpio = value.replace(/[^0-9.]/g, '');
    const numero = parseFloat(limpio);

    if (isNaN(numero)) {
      this.productoForm.get('precio')?.setValue('', { emitEvent: false });
      return;
    }

    // 🔹 Formatear a tipo moneda con 2 decimales
    const formateado = numero.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // 🔹 Asignar al formulario con símbolo de pesos
    this.productoForm.get('precio')?.setValue(`$${formateado}`, { emitEvent: false });
  }



  //formateamos el precio
  precioFormateado(precio: string): number {
    if (!precio) return 0;

    // Elimina el signo de pesos y las comas
    const valorLimpio = precio.replace(/\$/g, '').replace(/,/g, '');

    // Convierte a número flotante
    return parseFloat(valorLimpio);
  }



}
