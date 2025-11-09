import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import { DetalleProductosComponent } from '../detalle-productos/detalle-productos.component';
import { Component, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { API_RESPONSE_CODES, API_RESPONSE_MESSAGES } from '../../shared/codigosDeRespuesta';
import { ɵEmptyOutletComponent } from "@angular/router";
import { ComponenteSinConexionComponent } from '../../componente-sin-conexion/componente-sin-conexion.component';
import { OnlineServiceService } from '../../services/online-service.service';


@Component({
  selector: 'app-visualizacion-productos-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule],
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


  constructor(private service: ServicioProductosService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoria']) {
      this.categoria === 'Todos los productos'
        ? this.cargarTodosLosProductos()
        : this.cargarProductosPorCategoria(this.categoria);
    }
  }

  cargarTodosLosProductos(): void {

debugger

    this.isLoading = true;
    this.service.listarProductos().subscribe({
      next: (response) => {
        this.productos = response.data || [];

           console.log("mostramos el valor " + JSON.stringify(this.productos))
        this.updatePage();
        this.isLoading = false;

        console.log("Mostramos los productos " + JSON.stringify(this.productos));

      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error al obtener productos' });
      }
    });
  }

  cargarProductosPorCategoria(categoria: string): void {

    debugger

    this.isLoading = true;
    this.service.getProductosPorCategoriaNueva(categoria).subscribe({
      next: (response) => {
        this.productos = response.data || [];

        console.log("mostramos el valor " + JSON.stringify(this.productos))
        this.updatePage();
        this.isLoading = false;
        if (this.productos.length === 0) {
          Swal.fire({
            title: 'Sin productos',
            imageUrl: "icons/no_data_information.png",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image",
            html: `Lo sentimos, No hay productos < disponibles para esa categoría <strong>"${categoria}"</strong>.
              Lo invitamos a visualizar otras categorias.`
          });
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error al conectar con el servidor' });
      }
    });
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

  formatearNombre(nombre: string): string {
    return nombre.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }
}
