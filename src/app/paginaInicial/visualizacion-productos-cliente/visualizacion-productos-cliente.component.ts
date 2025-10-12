import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import { DetalleProductosComponent } from '../detalle-productos/detalle-productos.component';
import { Component, inject, Input, ViewChild } from '@angular/core';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);
  isLoading = true;
  productos: any[] = [];
  pagedProductos: any[] = [];
  pageSize = 6;
  currentPage = 0;
  pageSizeOptions = [6, 12, 24];

  constructor(private usuariosService: ServicioProductosService) {}

  ngOnChanges() {
    if (this.categoria) {
      this.cargarProductos(this.categoria);
    }
  }

  cargarProductos(categoria: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.productos = this.usuariosService.getProductosPorCategoria(categoria);

      // 🔹 Reiniciamos la página y el paginador al cambiar de categoría
      this.currentPage = 0;
      if (this.paginator) {
        this.paginator.firstPage();
      }

      this.updatePage();
      this.isLoading = false;
    }, 1000);
  }

  updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProductos = this.productos.slice(start, end);
  }

  handlePageEvent(event: PageEvent) {
    // 🔹 Reinicia al cambiar el tamaño de página
    if (event.pageSize !== this.pageSize) {
      this.currentPage = 0;
      this.paginator.firstPage();
    } else {
      this.currentPage = event.pageIndex;
    }

    this.pageSize = event.pageSize;
    this.updatePage();
  }

  onImagenError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'icons/no-disponible.png';
  }

  openDialog(producto: any) {
    const dialogRef = this.dialog.open(DetalleProductosComponent, {
      data: { producto, categoria: this.categoria }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
