import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizacionProductosClienteComponent } from '../visualizacion-productos-cliente/visualizacion-productos-cliente.component';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-componente-categorias-productos',
  standalone: true,
  imports: [ CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    VisualizacionProductosClienteComponent
  ],
  templateUrl: './componente-categorias-productos.component.html',
  styleUrl: './componente-categorias-productos.component.css'
})
export class ComponenteCategoriasProductosComponent {


  categorias: string[] = ['Cocinas', 'Bufeteros', 'Sillas'];
  // ✅ valor inicial = Cocinas
  categoriaSeleccionada: string = this.categorias[0];

  onCategoriaChange(value: string) {
    console.log('Categoría seleccionada:', value);
    // aquí puedes hacer la petición al servicio si lo requieres
  }





}
