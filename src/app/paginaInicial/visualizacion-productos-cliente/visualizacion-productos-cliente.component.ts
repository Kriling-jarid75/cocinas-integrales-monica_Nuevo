import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import { DetalleProductosComponent } from '../detalle-productos/detalle-productos.component';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-visualizacion-productos-cliente',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatPaginatorModule, MatButtonModule, MatDialogModule],
  templateUrl: './visualizacion-productos-cliente.component.html',
  styleUrl: './visualizacion-productos-cliente.component.css'
})
export class VisualizacionProductosClienteComponent {
  @Input() categoria: string = '';

  readonly dialog = inject(MatDialog);

  isLoading = true;
  productos: any[] = [];
  pagedProductos: any[] = [];
  pageSize = 6;
  currentPage = 0;
  pageSizeOptions = [6, 12, 24];
  imagenCargada: { [key: number]: boolean } = {};


  constructor(private usuariosService: ServicioProductosService) {}

  ngOnChanges() {
    if (this.categoria) {
      this.cargarProductos(this.categoria); // <<-- aquí usas tu método comentado
    }
  }

  cargarProductos(categoria: string) {
    console.log('Mostramos la categoría: ' + categoria);
    this.isLoading = true;

    setTimeout(() => {
      this.productos = this.usuariosService.getProductosPorCategoria(categoria);
      this.currentPage = 0;
      this.updatePage();
      this.isLoading = false;
    }, 3000);
  }

  updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProductos = this.productos.slice(start, end);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePage();
  }

  onImagenError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'icons/no-disponible.png'; // Aquí pones la imagen de “no disponible”
  }

  openDialog() {
    const dialogRef = this.dialog.open(DetalleProductosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
