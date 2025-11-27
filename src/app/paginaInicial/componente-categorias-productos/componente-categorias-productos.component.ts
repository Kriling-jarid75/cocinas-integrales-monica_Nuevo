import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizacionProductosClienteComponent } from '../visualizacion-productos-cliente/visualizacion-productos-cliente.component';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import Swal from 'sweetalert2';
import { API_RESPONSE_CODES } from '../../shared/codigosDeRespuesta/codigosDeRespuesta';
import { ModeloCategorias } from '../../models/productos/productos.module';


@Component({
  selector: 'app-componente-categorias-productos',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    VisualizacionProductosClienteComponent
  ],
  templateUrl: './componente-categorias-productos.component.html',
  styleUrl: './componente-categorias-productos.component.css'
})
export class ComponenteCategoriasProductosComponent {


  categoriasNuevas: Array<ModeloCategorias> = [];
  categoriaSeleccionada: string = 'Todos los productos'; // ✅ Valor inicial
  isLoading = false;

  constructor(private service: ServicioProductosService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  seleccionarCategoria(event: any): void {

    this.categoriaSeleccionada = event.value;
   // this.categoriaSeleccionada = this.categoriaSeleccionada.toLocaleLowerCase();

    console.log("Mostramos la categoria seleccionada " + this.categoriaSeleccionada);


  }

  private obtenerCategorias(): void {
    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          this.categoriasNuevas = response.data as ModeloCategorias[];
        } else {
          this.categoriasNuevas = []; // aseguramos que las categoriasNuevas esten vacias
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión con el servidor',
        });
      }
    });
  }

  private formatearNombre(nombre: string): string {
    return nombre
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }
}
