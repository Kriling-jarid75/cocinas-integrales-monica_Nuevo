import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-componente-registro-productos',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule],
  templateUrl: './componente-registro-productos.component.html',
  styleUrl: './componente-registro-productos.component.css'
})
export class ComponenteRegistroProductosComponent {
  productoForm: FormGroup;

  categorias: string[] = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar'];

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      console.log('Producto registrado:', this.productoForm.value);
      alert('Producto registrado con éxito!');
      this.productoForm.reset();
    } else {
      this.productoForm.markAllAsTouched();
    }
  }
}
