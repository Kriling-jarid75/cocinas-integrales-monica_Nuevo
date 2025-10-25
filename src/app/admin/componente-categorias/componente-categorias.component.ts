import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServicioProductosService } from '../../services/servicio-productos.service';

@Component({
  selector: 'app-componente-categorias',
  standalone: true,
  imports: [ MatFormFieldModule,
      MatInputModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule
  ],
  templateUrl: './componente-categorias.component.html',
  styleUrl: './componente-categorias.component.css'
})
export class ComponenteCategoriasComponent {


  categoriaForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private service: ServicioProductosService) { }

  ngOnInit() {
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', Validators.required],
    });

  }


  registrarCategoria() {
    if (this.categoriaForm.valid) {

      const nombreCategoria = this.categoriaForm.value.nombreCategoria;

      this.service.crearCategoria(this.categoriaForm.value).subscribe({
        next: (data) => {
          if (data.code === 200) {
            Swal.fire({
              icon: 'success',
              title: `Se registró correctamente la categoria: ${nombreCategoria}`,
              text: data.message
            });
            this.limiarCampos();

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un error al registrar la categoria',
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

      console.log('Categoria registrada:', nombreCategoria);

    } else {

      this.categoriaForm.markAllAsTouched();
    }
  }

  limiarCampos() {
    this.categoriaForm.controls['nombreCategoria'].setValue('');
  }

}
