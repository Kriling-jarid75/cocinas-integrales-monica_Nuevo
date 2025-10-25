import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { ServicioProductosService } from '../../../services/servicio-productos.service';

@Component({
  selector: 'app-componete-editar-categorias',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './componete-editar-categorias.component.html',
  styleUrl: './componete-editar-categorias.component.css'
})
export class ComponeteEditarCategoriasComponent {

  categoria: any;
  categoriaForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ComponeteEditarCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServicioProductosService,
    private fb: FormBuilder) {

    this.categoria = data.categoria;
  }


  ngOnInit() {
    this.categoriaForm = this.fb.group({
      nombreCategoria: [this.categoria?.nombreCategoria || '', Validators.required]
    });
  }


  editarCategoria() {
    if (this.categoriaForm.valid) {

      const nombreCategoria = this.categoriaForm.value.nombreCategoria;

      // Llamada al servicio
      this.service.editarProducto(this.categoriaForm.value).subscribe({
        next: (data) => {
          if (data.code === 200) {
            Swal.fire({
              icon: 'success',
              title: `Se actualizó correctamente el producto: ${nombreCategoria}`,
              text: data.message
            });
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
      this.categoriaForm.markAllAsTouched();
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
