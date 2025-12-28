import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductosModuleCocinasNuevos } from '../../models/productos/productos.module';
import { ServicioProductosService } from '../../services/servicio-general.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../componente-registro-productos/editar-producto/editar-producto.component';
import Swal from 'sweetalert2';
import { ComponenteSinConexionComponent } from '../../shared/componente-sin-conexion/componente-sin-conexion.component';
import { OnlineServiceService } from '../../services/online-service.service';
import { API_RESPONSE_CODES } from '../../shared/codigosDeRespuesta/codigosDeRespuesta';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-componente-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    MatFormField,
    MatLabel,
    ComponenteSinConexionComponent
  ],
  templateUrl: './componente-dashboard.component.html',
  styleUrl: './componente-dashboard.component.css'
})
export class ComponenteDashboardComponent {

  // Referencias para paginador y sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly dialog = inject(MatDialog);


  isLoading = true;
  productos: ProductosModuleCocinasNuevos[] = [];
  dataSource = new MatTableDataSource<ProductosModuleCocinasNuevos>([]);
  displayedColumns: string[] = ['nombre', 'descripcion', 'categoria', 'acciones'];

  errorMessage: string | null = null;
  online = true;

  constructor(
    private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.validarInternet();
  }

  ngAfterViewInit() {
    // Asignar paginator y sort cuando ya existen las vistas
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  validarInternet() {
    this.serviceSinConexion.online$.subscribe(status => {
      this.online = status;
      if (status) this.cargarProductos();
    });
  }

  cargarProductos() {
    this.isLoading = true;

    this.service.listarProductos().subscribe({
      next: (response) => {

        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          setTimeout(() => {
            this.productos = response.data;

            console.log("Mostramos todos los registros " + JSON.stringify(this.productos));

            // MatTableDataSource
            this.dataSource = new MatTableDataSource(this.productos);

            // Activar pagination y sort
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            // 👇 AÑADE ESTO
            this.dataSource.filterPredicate = (data: ProductosModuleCocinasNuevos, filter: string) => {
              const term = filter.trim().toLowerCase();

              return (
                data.nombre?.toLowerCase().includes(term) ||
                data.descripcion?.toLowerCase().includes(term) ||
                data.categoria?.nombreCategoria?.toLowerCase().includes(term)
              );
            };
            this.isLoading = false;
          }, 1200);
        }

        if (response.code === API_RESPONSE_CODES.NO_CONTENT) {
          Swal.fire({
            icon: 'info',
            title: 'No hay productos registrados',
          });

          this.productos = [];
          this.dataSource = new MatTableDataSource<ProductosModuleCocinasNuevos>([]);
          this.isLoading = false;
        }
      },

      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }

  // FILTRO REAL
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Editar
  updateProduct(producto: ProductosModuleCocinasNuevos) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      data: producto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.cargarProductos();
      }
    });
  }

  // Eliminar
  deleteProduct(producto: ProductosModuleCocinasNuevos) {
    Swal.fire({
      title: "¿Deseas borrar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar registro!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrado(producto);
      }
    });
  }

  borrado(producto: ProductosModuleCocinasNuevos) {
    this.service.eliminarProducto(producto).subscribe({
      next: (data) => {
        if (data.code === API_RESPONSE_CODES.SUCCESS) {
          Swal.fire({
            icon: 'success',
            title: `Se eliminó correctamente el producto: ${producto.nombre}`,
            text: data.message
          });

          this.cargarProductos();

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al eliminar el producto',
            text: data.message
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }
}
